'use client';

import { useState } from 'react';
import { trpcClient } from '@/utils/trpc';
import { Button } from '@/components/ui/button';

export default function TestSavePage() {
  const [id, setId] = useState('test-drawing');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!id.trim()) {
      setError('The ID cannot be empty');
      return;
    }

    try {
      setStatus('loading');
      setError(null);
      
      // Crea
      const mockContent = {
        timestamp: new Date().toISOString(),
        testData: 'This is a test content',
        shapes: [
          { id: '1', type: 'rectangle', x: 100, y: 100, width: 100, height: 100 }
        ]
      };
      
      await trpcClient.drawing.saveDrawing.mutate({
        id,
        content: mockContent
      });
      
      setStatus('success');
    } catch (err) {
      console.error('Error saving:', err);
      setError('Error saving data.');
      setStatus('error');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Save Test with tRPC</h1>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          ID of the drawing:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </label>
      </div>
      
      <Button
        onClick={handleSave}
        disabled={status === 'loading'}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {status === 'loading' ? 'Saving...' : 'Save test data'}
      </Button>
      
      {error && (
        <p className="mt-4 text-red-500">{error}</p>
      )}
      
      {status === 'success' && (
        <p className="mt-4 text-green-500">Data saved successfully!</p>
      )}
      
      <div className="mt-6">
        <a href="/test-trpc" className="text-blue-500 hover:underline">
          View drawing list
        </a>
      </div>
    </div>
  );
} 