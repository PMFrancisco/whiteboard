import { createNewWhiteboard } from "@/server/actions";
import { Button } from "../ui/button";
import { ReactNode } from "react";

interface NewWhiteboardButtonProps {
  children?: ReactNode;
}

export function NewWhiteboardButton({ children }: NewWhiteboardButtonProps) {
  return (
    <form action={createNewWhiteboard}>
      <Button type="submit" className="cursor-pointer">
        {children || "New Whiteboard"}
      </Button>
    </form>
  );
}
