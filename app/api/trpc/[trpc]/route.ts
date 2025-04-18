import { appRouter } from '@/server/routers/_app';
import { createContext } from '@/server/context';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { NextRequest } from 'next/server';

/**
 * API handler compatible with Next.js App Router
 * Handles all tRPC requests
 */
const handler = async (req: NextRequest) => {
  try {
    return await fetchRequestHandler({
      endpoint: '/api/trpc',
      req,
      router: appRouter,
      createContext,
      onError:
        process.env.NODE_ENV === 'development'
          ? ({ path, error }) => {
              console.error(
                `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
              );
            }
          : undefined,
    });
  } catch (error) {
    console.error('Unhandled tRPC error:', error);
    return new Response(
      JSON.stringify({
        message: 'Internal Server Error',
      }),
      {
        status: 500,
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  }
};

// Configure the HTTP methods we accept
export { handler as GET, handler as POST }; 