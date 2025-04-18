import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export type CreateContextOptions = Record<string, never>;

/**
 * Internal context - created for each request
 */
export const createInnerContext = async (opts: CreateContextOptions) => {
  return {
    // Custom context variables can be added here, for example:
    // session: opts.session,
    // prisma: opts.prisma,
  };
};

/**
 * External context - contains elements needed across all procedures
 * Such as global variables or active sessions
 */
export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const contextOptions = {};
  return await createInnerContext(contextOptions);
};

export type Context = Awaited<ReturnType<typeof createContext>>;
