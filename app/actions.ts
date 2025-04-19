'use server';

import { generateUUID } from '@/utils/uuidGenerator';
import { redirect } from 'next/navigation';

/**
 * Server action to create a new whiteboard
 * This function is executed on the server and redirects the client
 * to a new whiteboard with a generated UUID
 */
export async function createNewWhiteboard() {
  const uuid = generateUUID();
  redirect(`/whiteboard/${uuid}`);
} 