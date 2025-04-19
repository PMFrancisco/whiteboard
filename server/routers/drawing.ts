import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { prisma } from '@/server/prisma';
import { Prisma } from '@prisma/client';

// Validation schemas with Zod
const drawingContentSchema = z.object({
  schemaVersion: z.number({ required_error: 'schemaVersion is required' }),
  document: z.any(),
  session: z.any()
});

const drawingInputSchema = z.object({
  id: z.string().min(1, 'ID cannot be empty'),
  content: drawingContentSchema
});

const drawingIdSchema = z.string().min(1, 'ID cannot be empty');

export const drawingRouter = router({
  // Get a drawing by ID
  getDrawing: publicProcedure
    .input(drawingIdSchema)
    .query(async ({ input }) => {
      try {
        const drawing = await prisma.drawing.findUnique({
          where: { id: input }
        });
        
        if (!drawing) return null;
        
        return {
          id: drawing.id,
          content: {
            schemaVersion: drawing.schemaVersion,
            document: drawing.document as Prisma.JsonValue,
            session: drawing.session as Prisma.JsonValue
          }
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error retrieving drawing',
          cause: error,
        });
      }
    }),
    
  // Save a drawing
  saveDrawing: publicProcedure
    .input(drawingInputSchema)
    .mutation(async ({ input }) => {
      try {
        const { document, session } = input.content;
        
        const drawing = await prisma.drawing.upsert({
          where: { id: input.id },
          update: {
            schemaVersion: input.content.schemaVersion,
            document: document as Prisma.InputJsonValue,
            session: session as Prisma.InputJsonValue
          },
          create: {
            id: input.id,
            schemaVersion: input.content.schemaVersion,
            document: document as Prisma.InputJsonValue,
            session: session as Prisma.InputJsonValue
          }
        });

        return { success: true, id: drawing.id };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error saving drawing',
          cause: error,
        });
      }
    }),
    
  // List all available drawing IDs
  listDrawings: publicProcedure
    .query(async () => {
      try {
        const drawings = await prisma.drawing.findMany({
          select: { id: true }
        });
        return drawings.map(drawing => ({ id: drawing.id }));
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error listing drawings',
          cause: error,
        });
      }
    }),
    
  // Delete a drawing
  deleteDrawing: publicProcedure
    .input(drawingIdSchema)
    .mutation(async ({ input }) => {
      try {
        const drawing = await prisma.drawing.delete({
          where: { id: input }
        });
        
        return { success: true, id: drawing.id };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Drawing with ID: ${input} not found`,
        });
      }
    }),
});