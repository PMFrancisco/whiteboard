import { publicProcedure, router } from '../trpc';
import fs from 'fs/promises';
import path from 'path';

// Drawing data interface
interface DrawingData {
  id: string;
  content: any; // We can refine this type later based on the exact structure of tldraw
}

// Path to the file where we'll save the data
const DATA_FILE = path.join(process.cwd(), 'data', 'drawings.json');

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
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(drawings, null, 2), 'utf-8');
};

// Load the data from the file
const loadDrawingsFromFile = async (): Promise<Record<string, any>> => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist or is empty, return an empty object
    return {};
  }
};

// Manual validation for drawing data
const validateDrawingData = (data: any): DrawingData => {
  if (!data || typeof data !== 'object') {
    throw new Error('Los datos deben ser un objeto');
  }
  
  if (typeof data.id !== 'string' || !data.id) {
    throw new Error('El ID debe ser un string no vacío');
  }
  
  if (!data.content) {
    throw new Error('El contenido no puede estar vacío');
  }
  
  return {
    id: data.id,
    content: data.content
  };
};

export const drawingRouter = router({
  // Get a drawing by ID
  getDrawing: publicProcedure
    .input((value: unknown) => {
      if (typeof value !== 'string') {
        throw new Error('El ID debe ser un string');
      }
      return value;
    })
    .query(async ({ input }) => {
      const drawings = await loadDrawingsFromFile();
      return drawings[input] || null;
    }),
    
  // Save a drawing
  saveDrawing: publicProcedure
    .input(validateDrawingData)
    .mutation(async ({ input }) => {
      const drawings = await loadDrawingsFromFile();
      drawings[input.id] = input.content;
      await saveDrawingsToFile(drawings);
      return { success: true };
    }),
    
  // List all available drawing IDs
  listDrawings: publicProcedure
    .query(async () => {
      const drawings = await loadDrawingsFromFile();
      return Object.keys(drawings);
    }),
}); 