"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createChat, getUserChats } from "@/actions/chat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Plus, Trash } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
  const router = useRouter();
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChats();
  }, []);

  async function loadChats() {
    try {
      const userChats = await getUserChats();
      setChats(userChats);
    } catch (error) {
      console.error("Failed to load chats:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateChat() {
    try {
      const chat = await createChat();
      router.push(`/dashboard/chat/${chat.id}`);
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Chat</h1>
          <p className="text-muted-foreground">
            Start a conversation with AI models
          </p>
        </div>
        <Button onClick={handleCreateChat}>
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>

      {loading ? (
        <div>Loading chats...</div>
      ) : chats.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {chats.map((chat) => (
            <Link key={chat.id} href={`/dashboard/chat/${chat.id}`}>
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">
                    {chat.title}
                  </CardTitle>
                  <CardDescription>
                    {chat.messages.length} messages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Updated {new Date(chat.updatedAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No chats yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first chat to start conversing with AI
            </p>
            <Button onClick={handleCreateChat}>
              <Plus className="mr-2 h-4 w-4" />
              Create Chat
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
