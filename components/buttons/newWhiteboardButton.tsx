import { createNewWhiteboard } from "@/server/actions";
import { Button } from "../ui/button";

export function NewWhiteboardButton() {
  return (
    <form action={createNewWhiteboard}>
      <Button type="submit">
        New Whiteboard
      </Button>
    </form>
  );
}

export function NewWhiteboardButtonVariant({
  variant = "default",
  children = "New Whiteboard",
  className = "",
}: {
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <form action={createNewWhiteboard}>
      <Button 
        type="submit" 
        variant={variant}
        className={className}
      >
        {children}
      </Button>
    </form>
  );
} 