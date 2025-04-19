import Link from "next/link";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { Button } from "../ui/button";

interface WhiteboardCardProps {
  id: string;
}

export function WhiteboardCard({ id }: WhiteboardCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const utils = trpc.useUtils();
  
  const deleteDrawingMutation = trpc.drawing.deleteDrawing.useMutation({
    onSuccess: () => {
      // Refetch the list of drawings after successful deletion
      utils.drawing.listDrawings.invalidate();
    },
    onError: (error) => {
      console.error("Error deleting whiteboard:", error);
      setIsDeleting(false);
    }
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    if (window.confirm("Are you sure you want to delete this whiteboard?")) {
      setIsDeleting(true);
      deleteDrawingMutation.mutate(id);
    }
  };

  return (
    <div className="relative block p-6 rounded-lg border hover:border-blue-400 transition-colors">
      <Link href={`/whiteboard/${id}`} className="block">
        <div className="font-medium mb-2">Whiteboard</div>
        <div className="text-gray-500 text-sm truncate">{id}</div>
      </Link>
      <Button
        onClick={handleDelete}
        disabled={isDeleting}
        variant="destructive"
        className="absolute top-2 right-2 hover:text-red-700 p-1 rounded-lg hover:bg-red-50"
        aria-label="Delete whiteboard"
      >Delete
      </Button>
    </div>
  );
} 