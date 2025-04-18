import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';
import superjson from 'superjson';
import { ZodError } from 'zod';

/**
 * tRPC initialization with advanced configuration
 */
const t = initTRPC.context<Context>().create({
  /**
   * Transformer for dates and complex types serialization
   */
  transformer: superjson,
  
  /**
   * Error formatter for detailed error messaging
   */
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Constructors for router creation
 */
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

/**
 * Protected procedure for authentication implementation
 */
const isAuthenticated = middleware(({ ctx, next }) => {
  // Authentication logic placeholder
  // if (!ctx.user) {
  //   throw new TRPCError({ code: 'UNAUTHORIZED' });
  // }
  return next({
    ctx: {
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthenticated);
