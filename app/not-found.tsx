import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-cyan-50 h-full">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page not found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild size="lg" className="gap-2">
          <Link href="/">
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  );
} 