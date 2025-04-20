"use client";

import { createNewWhiteboard } from "@/server/actions";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface NewWhiteboardButtonProps {
  children?: ReactNode;
}

export function NewWhiteboardButton({ children }: NewWhiteboardButtonProps) {
  const router = useRouter();

  const handleCreate = async () => {
    try {
      const result = await createNewWhiteboard();
      if (result.success) {
        router.push(`/whiteboard/${result.id}`);
      }
    } catch (error) {
      console.error("Error creating whiteboard:", error);
    }
  };

  return (
    <Button onClick={handleCreate} className="cursor-pointer">
      {children || "New Whiteboard"}
    </Button>
  );
}
