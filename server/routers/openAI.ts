import { openai } from '../openAiClient';
import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

export const openAIRouter = router({
    generateImage: publicProcedure
    .input(z.object({ prompt: z.string().min(1) }))
    .mutation(async ({ input }) => {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: input.prompt,
            quality: "hd",
            size: "1024x1024",
        });
        return { url: response.data[0].url };
    }),
});

    
