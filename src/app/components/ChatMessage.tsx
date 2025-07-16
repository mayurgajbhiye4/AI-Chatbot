import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Copy, Download, User, Bot } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    isUser: boolean;
    code?: string;
  };
  onPreview?: (code: string) => void;
}

export function ChatMessage({ message, onPreview }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

  const downloadHTML = (code: string) => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-page.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("HTML file downloaded!");
  };

  return (
    <div className={`flex gap-3 p-4 ${message.isUser ? "bg-muted/50" : "bg-background"}`}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback className={message.isUser ? "bg-primary text-primary-foreground" : "bg-secondary"}>
          {message.isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar> 
      
      <div className="flex-1 space-y-2">
        <div className="text-sm text-foreground whitespace-pre-wrap break-words">
          {message.content}
        </div>
        
        {message.code && (
          <div className="space-y-2">
            <div className="bg-card border rounded-lg p-3 min-w-0 max-h-100 overflow-y-auto">
              <div className="flex items-center justify-between sticky top-0 bg-card p-2 rounded-t-lg border-b">
                <span className="text-xs font-medium text-muted-foreground">Generated HTML/CSS</span>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(message.code!)}
                    className="h-7 px-2 cursor-pointer"
                  >
                    <Copy className="h-3 w-3" />
                    {copied ? "Copied!" : "Copy"} 
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => downloadHTML(message.code!)}
                    className="h-7 px-2 cursor-pointer"
                  >
                    <Download className="h-3 w-3" />
                    Download
                  </Button>
                  {onPreview && (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => onPreview(message.code!)}
                      className="h-7 px-2 cursor-pointer"
                    >
                      Preview
                    </Button>
                  )}
                </div>
              </div>
              <pre className="text-xs bg-muted p-2 rounded text-muted-foreground w-full break-all whitespace-pre-wrap">
                <code>{message.code}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}