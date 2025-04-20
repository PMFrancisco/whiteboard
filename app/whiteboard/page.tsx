import { NewWhiteboardButton } from "@/components/buttons/newWhiteboardButton";
import ErrorMessage from "@/components/errorMessage";
import { WhiteboardList } from "@/components/lists/whiteboardList";
import { WhiteboardSkeletonList } from "@/components/skeletons/whiteboardSkeleton";
import { Suspense } from "react";

export default function WhiteboardListPage() {
  try {
    return (
      <div className="flex flex-col items-center p-6 bg-gradient-to-br from-indigo-50 to-cyan-50 h-full">
        <div className="max-w-6xl w-full">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Your Whiteboards</h1>
            <NewWhiteboardButton />
          </div>
          <Suspense fallback={<WhiteboardSkeletonList />}>
            <WhiteboardList />
          </Suspense>
        </div>
      </div>
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return <ErrorMessage message={errorMessage} />
  }
}
