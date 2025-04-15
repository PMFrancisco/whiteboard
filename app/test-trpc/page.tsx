'use client';

import { useState, useEffect } from 'react';
import { trpcClient } from '@/utils/trpc';

export default function TestTrpcPage() {
  const [drawings, setDrawings] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDrawings() {
      try {
        const result = await trpcClient.drawing.listDrawings.query();
        setDrawings(result);
        setLoading(false);
      } catch (err) {
        console.error('Error loading drawings:', err);
        setError('Error loading drawings.');
        setLoading(false);
      }
    }

    fetchDrawings();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">tRPC Test</h1>
      
      {loading && <p>Loading...</p>}
      
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Available Drawings:</h2>
          {drawings.length === 0 ? (
            <p>No drawings saved.</p>
          ) : (
            <ul className="list-disc pl-5">
              {drawings.map((id) => (
                <li key={id}>{id}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
} 