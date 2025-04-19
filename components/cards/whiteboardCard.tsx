import Link from "next/link";
import { DeleteWhiteboardButton } from "../buttons/deleteWhiteboardButton";

interface WhiteboardCardProps {
  id: string;
}

export function WhiteboardCard({ id }: WhiteboardCardProps) {
  return (
    <div className="relative block p-6 rounded-lg border hover:border-blue-400 transition-colors">
      <Link href={`/whiteboard/${id}`} className="block">
        <div className="font-medium mb-2">Whiteboard</div>
        <div className="text-gray-500 text-sm truncate">{id}</div>
      </Link>
      <DeleteWhiteboardButton id={id} />
    </div>
  );
} 