'use client';

import { createTRPCNext } from '@trpc/next';
import { httpBatchLink } from '@trpc/client';
import { AppRouter, appRouter } from '@/server/routers/_app';
import superjson from 'superjson';


/**
 * tRPC client configured with createTRPCNext for optimal integration with Next.js
 */
export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: '/api/trpc',
          transformer: superjson,
        }),
      ],
    };
  },
  ssr: false,
  transformer: superjson,
});

/**
 * Custom hooks to handle tRPC errors
 */
export function formatTRPCError(error: any): string {
  if (!error) return 'Unknown error';
  
  // Try to extract the main error message
  const message = error.message || 'Unknown error';
  
  // If there's a Zod error, format the message
  if (error.data?.zodError) {
    const fieldErrors = error.data.zodError.fieldErrors;
    if (fieldErrors && Object.keys(fieldErrors).length > 0) {
      const errors = Object.entries(fieldErrors)
        .map(([field, errors]) => `${field}: ${(errors as string[]).join(', ')}`)
        .join('; ');
      return `Invalid data: ${errors}`;
    }
  }
  
  return message;
}

export const { withTRPC } = trpc; 