'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-cyan-50 h-full">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">Error</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Something went wrong</h2>
        <p className="text-gray-600 mb-8">
          Sorry, an error occurred while processing your request.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={reset}
            size="lg"
            className="gap-2"
          >
            Try again
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              Back to home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 