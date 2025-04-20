import { router } from '../trpc';
import { drawingRouter } from './drawing';
import { openAIRouter } from './openAI';

export const appRouter = router({
  drawing: drawingRouter,
  openAI: openAIRouter,
});

export type AppRouter = typeof appRouter; 