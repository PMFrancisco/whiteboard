import { appRouter } from '@/server/routers/_app';
import { createContext } from '@/server/context';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';


// Handle HTTP requests for tRPC
const handler = async (req: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
  });
};

// Configure the HTTP methods we accept
export { handler as GET, handler as POST }; 