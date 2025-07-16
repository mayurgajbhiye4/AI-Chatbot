// NOTE: This hook is intended for use in Next.js client components only.
import { useState } from "react";
import { toast } from "sonner";

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  code?: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: `Welcome to TechLander. Create any type of landing page for your business. Build something like:
                \n• Build a landing page for a cozy Italian restaurant with a full menu, reservation form, and Google Maps location.
                \n• Design a landing page for a fashion e-commerce brand with product carousel, limited-time offers, and customer testimonials.
                \n• Create a yoga studio homepage with class schedules, instructor bios, and membership pricing.
                `,
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const generateHTMLCSS = async (prompt: string): Promise<string> => {
    // Call the backend API route to generate HTML/CSS
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    if (!res.ok) throw new Error("Failed to generate code");
    const data = await res.json();
    return data.code;
  };

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const generatedCode = await generateHTMLCSS(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I've generated a beautiful landing page based on your request! You can preview it on the right, copy the code, or download it as an HTML file.",
        isUser: false,
        code: generatedCode,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast.error("Failed to generate code. Please try again.");
      console.error("Error generating code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
  };
}