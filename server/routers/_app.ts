import { router } from '../trpc';
import { drawingRouter } from './drawing';

export const appRouter = router({
  drawing: drawingRouter,
});

export type AppRouter = typeof appRouter; 