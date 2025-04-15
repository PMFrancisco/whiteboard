import { router } from '../trpc';
import { drawingRouter } from './drawing';

export const appRouter = router({
  drawing: drawingRouter,
});

// Tipo del router para usar en el cliente
export type AppRouter = typeof appRouter; 