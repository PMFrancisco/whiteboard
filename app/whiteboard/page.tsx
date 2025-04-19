
import { NewWhiteboardButton } from "@/components/buttons/newWhiteboardButton";
import ErrorMessage from "@/components/errorMessage";
import { WhiteboardList } from "@/components/lists/whiteboardList";

export default function WhiteboardListPage() {
  try {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Whiteboards</h1>
          <NewWhiteboardButton />
        </div>
        <WhiteboardList />
      </div>
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return <ErrorMessage message={errorMessage} />
  }
}
