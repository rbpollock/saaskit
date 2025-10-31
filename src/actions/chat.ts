"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getChatCompletion, AVAILABLE_MODELS } from "@/lib/openrouter";
import { deductCredits } from "@/lib/credits";
import { revalidatePath } from "next/cache";

export async function createChat(title?: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const chat = await prisma.chat.create({
    data: {
      userId: session.user.id,
      title: title || "New Chat",
    },
  });

  revalidatePath("/dashboard");
  return chat;
}

export async function sendMessage(
  chatId: string,
  content: string,
  model: string = "openai/gpt-4o-mini"
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Verify chat belongs to user
  const chat = await prisma.chat.findFirst({
    where: { id: chatId, userId: session.user.id },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });

  if (!chat) {
    throw new Error("Chat not found");
  }

  // Find model credits
  const modelInfo = AVAILABLE_MODELS.find((m) => m.id === model);
  const creditsRequired = modelInfo?.credits || 10;

  // Check credits
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { credits: true },
  });

  if (!user || user.credits < creditsRequired) {
    throw new Error("Insufficient credits");
  }

  // Create user message
  await prisma.message.create({
    data: {
      chatId,
      role: "user",
      content,
    },
  });

  // Prepare messages for AI
  const messages = [
    ...chat.messages.map((m) => ({
      role: m.role as "system" | "user" | "assistant",
      content: m.content,
    })),
    { role: "user" as const, content },
  ];

  // Get AI response
  const response = await getChatCompletion(messages, model);

  // Save assistant message
  const assistantMessage = await prisma.message.create({
    data: {
      chatId,
      role: "assistant",
      content: response.content,
      tokens: response.tokens,
    },
  });

  // Deduct credits
  await deductCredits(session.user.id, creditsRequired, "chat_message", {
    model,
    tokens: response.tokens,
    chatId,
  });

  // Update chat title if it's the first message
  if (chat.messages.length === 0) {
    await prisma.chat.update({
      where: { id: chatId },
      data: { title: content.slice(0, 50) },
    });
  }

  revalidatePath(`/dashboard/chat/${chatId}`);
  return assistantMessage;
}

export async function getChatHistory(chatId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const chat = await prisma.chat.findFirst({
    where: { id: chatId, userId: session.user.id },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
    },
  });

  return chat;
}

export async function getUserChats() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const chats = await prisma.chat.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      messages: {
        take: 1,
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return chats;
}

export async function deleteChat(chatId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.chat.delete({
    where: { id: chatId, userId: session.user.id },
  });

  revalidatePath("/dashboard");
}
