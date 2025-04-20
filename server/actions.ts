'use server';

import { prisma } from '@/server/prisma';
import { generateUUID } from '@/utils/uuidGenerator';
import { redirect } from 'next/navigation';

/**
 * Server action to get all drawings
 * This function is executed on the server and returns the list of drawings
 */
export async function getDrawings() {
  try {
    const drawings = await prisma.drawing.findMany({
      select: { id: true }
    });
    return drawings.map(drawing => ({ id: drawing.id }));
  } catch (error) {
    console.error('Error listing drawings:', error);
    return [];
  }
}

/**
 * Server action to delete a whiteboard
 * This function is executed on the server and deletes the whiteboard with the given ID
 */
export async function deleteWhiteboard(id: string) {
  try {
    await prisma.drawing.delete({
      where: { id }
    });
    return { success: true, id };
  } catch (error) {
    console.error(`Error deleting drawing with ID: ${id}`, error);
    throw new Error(`Failed to delete whiteboard: ${id}`);
  }
} 

/**
 * Server action to create a new whiteboard
 * This function is executed on the server and redirects the client
 * to a new whiteboard with a generated UUID
 */
export async function createNewWhiteboard() {
  try {
    const uuid = generateUUID();
    
    // Crear el whiteboard en la base de datos
    await prisma.drawing.create({
      data: {
        id: uuid,
        schemaVersion: 1,
        document: {},
        session: {}
      }
    });

    return { success: true, id: uuid };
  } catch (error) {
    console.error('Error creating new whiteboard:', error);
    throw new Error('Failed to create new whiteboard');
  }
} 