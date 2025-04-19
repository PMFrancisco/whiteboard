"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { deleteWhiteboard } from "@/server/actions";

interface DeleteWhiteboardButtonProps {
  id: string;
}

export function DeleteWhiteboardButton({ id }: DeleteWhiteboardButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    if (window.confirm("Are you sure you want to delete this whiteboard?")) {
      setIsDeleting(true);
      try {
        await deleteWhiteboard(id);
        // Page will reload automatically after deletion
        window.location.reload();
      } catch (error) {
        console.error("Error deleting whiteboard:", error);
        setIsDeleting(false);
      }
    }
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={isDeleting}
      variant="destructive"
      className="absolute top-2 right-2 hover:text-red-700 p-1 rounded-lg hover:bg-red-50"
      aria-label="Delete whiteboard"
    >
      Delete
    </Button>
  );
} 