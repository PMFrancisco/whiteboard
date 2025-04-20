"use client";

import { createNewWhiteboard } from "@/server/actions";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NewWhiteboardButtonProps {
  children?: ReactNode;
}

export function NewWhiteboardButton({ children }: NewWhiteboardButtonProps) {
  const router = useRouter();

  const handleCreate = async () => {
    try {
      const result = await createNewWhiteboard();
      if (result.success) {
        toast.success("Board created successfully", {
          description: "Redirecting to the new board...",
        });
        setTimeout(() => {
          router.push(`/whiteboard/${result.id}`);
        }, 1000);
      }
    } catch (error) {
      console.error("Error creating whiteboard:", error);
      toast.error("Error creating whiteboard", {
        description: "Try again later",
      });
    }
  };

  return (
    <Button onClick={handleCreate} className="cursor-pointer">
      {children || "New Whiteboard"}
    </Button>
  );
}
