"use client";
import { useState } from "react";
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";
import { LivePreview } from "./components/LivePreview";
import { useChat } from "./hooks/useChat";
import { ScrollArea } from "./components/ui/scroll-area";
import { Card } from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import { ThemeToggle } from "./components/ThemeToggle";

export default function Page() {
  const { messages, sendMessage, isLoading } = useChat();
  const [previewCode, setPreviewCode] = useState("");

  const handlePreview = (code: string) => {
    setPreviewCode(code);
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
            <ThemeToggle />
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
        
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>

      {/* Preview Panel */}
      <div className="w-1/2 flex flex-col">
        <LivePreview code={previewCode} />
      </div>
    </div>
  );
}