import { prisma } from "@/lib/prisma";

export async function deductCredits(
  userId: string,
  credits: number,
  action: string,
  metadata?: {
    model?: string;
    tokens?: number;
    chatId?: string;
  }
) {
  // Check if user has enough credits
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.credits < credits) {
    throw new Error("Insufficient credits");
  }

  // Deduct credits and log usage
  const [updatedUser] = await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { credits: { decrement: credits } },
    }),
    prisma.creditUsage.create({
      data: {
        userId,
        action,
        credits,
        model: metadata?.model,
        tokens: metadata?.tokens,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    }),
  ]);

  return updatedUser;
}

export async function addCredits(userId: string, credits: number) {
  return prisma.user.update({
    where: { id: userId },
    data: { credits: { increment: credits } },
  });
}

export async function getUserCredits(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true },
  });

  return user?.credits || 0;
}

export async function getCreditUsageStats(userId: string) {
  const usages = await prisma.creditUsage.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const totalUsed = usages.reduce((sum, usage) => sum + usage.credits, 0);

  const byAction = usages.reduce((acc, usage) => {
    acc[usage.action] = (acc[usage.action] || 0) + usage.credits;
    return acc;
  }, {} as Record<string, number>);

  const byModel = usages.reduce((acc, usage) => {
    if (usage.model) {
      acc[usage.model] = (acc[usage.model] || 0) + usage.credits;
    }
    return acc;
  }, {} as Record<string, number>);

  return {
    totalUsed,
    byAction,
    byModel,
    recentUsage: usages.slice(0, 10),
  };
}
