import { AppRouter } from '@/server/routers/_app';
import { createTRPCClient, httpBatchLink } from '@trpc/client';

// Create tRPC client
export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/api/trpc',
    }),
  ],
}); 