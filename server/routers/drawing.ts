import { publicProcedure, router } from '../trpc';
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

// Path to the file where the data will be saved
const DATA_FILE = path.join(process.cwd(), 'data', 'drawings.json');

// Validation schemas with Zod
// Ensures the tldraw snapshot has a schema version
const drawingContentSchema = z.object({
  schemaVersion: z.number({ required_error: 'schemaVersion is required' }),
}).passthrough(); // Allows any other fields for tldraw content

const drawingInputSchema = z.object({
  id: z.string().min(1, 'ID cannot be empty'),
  content: drawingContentSchema
});

const drawingIdSchema = z.string().min(1, 'ID cannot be empty');

// Ensure the directory exists
const ensureDataDir = async () => {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  } catch (error) {
    // Ignore error if the directory already exists
  }
};

// Save the data to the file
const saveDrawingsToFile = async (drawings: Record<string, any>) => {
  try {
    await ensureDataDir();
    await fs.writeFile(DATA_FILE, JSON.stringify(drawings, null, 2), 'utf-8');
  } catch (error) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Error saving drawings',
      cause: error,
    });
  }
};

// Load the data from the file
const loadDrawingsFromFile = async (): Promise<Record<string, any>> => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      // If the file doesn't exist, return an empty object
      return {};
    }
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Error loading drawings',
      cause: error,
    });
  }
};

export const drawingRouter = router({
  // Get a drawing by ID
  getDrawing: publicProcedure
    .input(drawingIdSchema)
    .query(async ({ input }) => {
      try {
        const drawings = await loadDrawingsFromFile();
        return drawings[input] ? { id: input, content: drawings[input] } : null;
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
        // Verify that the content has a schemaVersion
        if (typeof input.content !== 'object' || !input.content) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Drawing content must be an object',
          });
        }
        
        // schemaVersion is required by the schema validation
        // this check is not needed, but we'll keep it for extra safety
        if (!('schemaVersion' in input.content)) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'schemaVersion is required in drawing content',
          });
        }
        
        const drawings = await loadDrawingsFromFile();
        drawings[input.id] = input.content;
        await saveDrawingsToFile(drawings);
        return { success: true, id: input.id };
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
        const drawings = await loadDrawingsFromFile();
        return Object.keys(drawings).map(id => ({ id }));
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
        const drawings = await loadDrawingsFromFile();
        if (drawings[input]) {
          delete drawings[input];
          await saveDrawingsToFile(drawings);
          return { success: true, id: input };
        } else {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `Drawing with ID: ${input} not found`,
          });
        }
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error deleting drawing',
          cause: error,
        });
      }
    }),
});