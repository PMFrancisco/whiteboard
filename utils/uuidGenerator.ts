/**
 * Utility function to generate a UUID v4
 * @returns {string} - A random UUID v4 string
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Generate a random schema version (for demonstration purposes)
 * In a real application, this would likely be a specific version number
 * @returns {number} - A schema version number
 */
export function generateSchemaVersion(): number {
  // For this example, we'll use 1 which is the default for tldraw
  return 1;
} 