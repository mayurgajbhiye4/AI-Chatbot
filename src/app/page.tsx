"use client";
import { useState } from "react";
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";
import { LivePreview } from "./components/LivePreview";
import { useChat } from "./hooks/useChat";
import { ScrollArea } from "./components/ui/scroll-area";
import { ThemeToggle } from "./components/ThemeToggle";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./components/ui/button";

export default function Page() {
  const { messages, sendMessage, isLoading } = useChat();
  const [previewCode, setPreviewCode] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handlePreview = (code: string) => {
    setPreviewCode(code);
  };

  // Restrict sending messages if not authenticated
  const handleSendMessage = (message: string) => {
    if (!session?.user) {
      router.push("/auth/login");
      return;
    }
    sendMessage(message);
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Chat Panel */}
      <div className="flex-1 flex flex-col border-r">
        <div className="p-4 border-b bg-card">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Landing Page Generator</h1>
              <p className="text-sm text-muted-foreground">Create beautiful landing pages with AI</p>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {session?.user ? (
                <>
                  <span>{session.user.name || session.user.email}</span>
                  <Button onClick={() => signOut()} variant="outline" className="cursor-pointer">Logout</Button>
                </>
              ) : (
                <Button asChild className="btn-primary cursor-pointer">
                  <a href="/auth/login">Login</a>
                </Button>
              )}
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="divide-y">
            {messages.map((message: any) => (
              <ChatMessage
                key={message.id}
                message={message}
                onPreview={handlePreview}
              />
            ))}
          </div>
        </ScrollArea>

        {/* Disable ChatInput if not authenticated */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          disabled={!session?.user}
        />
      </div>

      {/* Preview Panel */}
      <div className="w-1/2 flex flex-col">
        <LivePreview code={previewCode} />
      </div>
    </div>
  );
}