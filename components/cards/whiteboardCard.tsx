import { DeleteWhiteboardButton } from "../buttons/deleteWhiteboardButton";
import { OpenWhiteboardButton } from "../buttons/openWhiteboardButton";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardAction } from "@/components/ui/card";

interface WhiteboardCardProps {
  id: string;
}

export function WhiteboardCard({ id }: WhiteboardCardProps) {
  return (
    <Card className="hover:border-blue-400 transition-colors">
      <CardHeader>
        <CardTitle>Whiteboard</CardTitle>
        <CardDescription className="truncate">
          {id}
        </CardDescription>
        <CardAction>
          <DeleteWhiteboardButton id={id} />
        </CardAction>
      </CardHeader>
      <CardFooter className="text-xs text-muted-foreground">
        <OpenWhiteboardButton id={id} />
      </CardFooter>
    </Card>
  );
} 