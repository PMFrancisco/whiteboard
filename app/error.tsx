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
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">Error</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Something went wrong</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Sorry, an error occurred while processing your request.
      </p>
      <div className="flex gap-4">
        <Button
          onClick={reset}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try again
        </Button>
        <Link 
          href="/" 
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
} 