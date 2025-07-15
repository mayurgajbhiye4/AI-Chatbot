import { Button } from "../components/ui/button";
import { RefreshCw, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface LivePreviewProps {
  code: string;
}

export function LivePreview({ code }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshPreview = () => {
    setIsRefreshing(true);
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.src = "about:blank";
      setTimeout(() => {
        updateIframeContent();
        setIsRefreshing(false);
      }, 100);
    }
  };

  const updateIframeContent = () => {
    if (iframeRef.current && code) {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(String(code));
        iframeDoc.close();
      }
    }
  };

  const openInNewTab = () => {
    const newWindow = window.open();
    if (newWindow && code) {
      newWindow.document.write(String(code));
      newWindow.document.close();
    }
  };

  useEffect(() => {
    updateIframeContent();
  }, [code]);

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between p-3 border-b bg-muted/50">
        <h3 className="font-medium text-sm">Live Preview</h3>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={refreshPreview}
            disabled={isRefreshing}
            className="h-7 px-2"
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={openInNewTab}
            className="h-7 px-2"
          >
            <ExternalLink className="h-3 w-3" />
            Open
          </Button>
        </div>
      </div>
      
      <div className="flex-1 bg-muted">
        {code ? (
          <iframe
            ref={iframeRef}
            className="w-full h-full border-0"
            title="Live Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <div className="text-2xl mb-2">🎨</div>
              <p>Generate some code to see the live preview</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}