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
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import type { Message } from "./hooks/useChat";

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
      <PanelGroup direction="horizontal">
        <Panel defaultSize={30} minSize={20} className="flex flex-col h-full">
          {/* Chat Panel */}
          <div className="flex-1 flex flex-col border-r h-full">
            <div className="p-4 border-b bg-card">
              <div className="flex items-center justify-between">
                <div> 
                  <h1 className="text-xl font-semibold">TechLander</h1>
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
                {messages.map((message: Message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    onPreview={handlePreview}
                  />
                ))}
              </div>
            </ScrollArea>

            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              disabled={!session?.user}
            />
          </div>
        </Panel>  
        <PanelResizeHandle className="w-2 bg-muted cursor-col-resize" />
        <Panel defaultSize={70} className="flex flex-col h-full min-h-0">
          <div className="flex-1 flex flex-col min-h-0">
            <LivePreview code={previewCode} />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}