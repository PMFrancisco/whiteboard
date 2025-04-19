import { WhiteboardCard } from "@/components/cards/whiteboardCard";
import { NewWhiteboardButtonVariant } from "@/components/buttons/newWhiteboardButton";
import { getDrawings } from "@/server/actions";

export async function WhiteboardList() {
  // Obtain the whiteboards from the database
  const whiteboards = await getDrawings();

  if (!whiteboards || whiteboards.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500 mb-4">No whiteboards found</p>
        <NewWhiteboardButtonVariant>
          Create Your First Whiteboard
        </NewWhiteboardButtonVariant>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {whiteboards.map((board) => (
        <WhiteboardCard key={board.id} id={board.id} />
      ))}
    </div>
  );
} 