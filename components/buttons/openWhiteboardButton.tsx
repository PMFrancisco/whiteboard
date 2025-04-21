"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface OpenWhiteboardButtonProps {
  id: string;
}

export function OpenWhiteboardButton({ id }: OpenWhiteboardButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => {
    setIsLoading(true);
    router.push(`/whiteboard/${id}`);
  };

  return (
    <Button
      variant="link"
      onClick={handleOpen}
      disabled={isLoading}
      className="w-full text-blue-600 hover:underline p-0 h-auto"
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Opening...</span>
        </div>
      ) : (
        "Open Whiteboard"
      )}
    </Button>
  );
} 