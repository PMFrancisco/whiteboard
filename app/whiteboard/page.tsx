"use client";

import { Tldraw, getSnapshot, loadSnapshot } from "tldraw";
import "tldraw/tldraw.css";
import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";

// Main component that directly uses tRPC hooks
export default function WhiteboardPage() {
  const [editor, setEditor] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Use tRPC hooks for queries and mutations
  const saveDrawingMutation = trpc.drawing.saveDrawing.useMutation();
  
  const getDrawingQuery = trpc.drawing.getDrawing.useQuery("whiteboard", {
    enabled: !!editor,
    refetchOnWindowFocus: false,
  });

  // Function to save the current state
  const saveState = async () => {
    if (!editor) return;

    try {
      setIsSaving(true);
      setErrorMessage(null);

      // Get the snapshot directly
      const snapshot = getSnapshot(editor.store);
      
      console.log("Saving snapshot:", {
        hasSchemaVersion: 'schemaVersion' in snapshot,
        snapshotKeys: Object.keys(snapshot),
      });

      // Save the state using tRPC
      await saveDrawingMutation.mutateAsync({
        id: "whiteboard",
        content: snapshot as any, // Using 'as any' to avoid typing issues with the snapshot
      });

      console.log("Whiteboard state saved successfully");
    } catch (error) {
      console.error("Error in saveState:", error);
      setErrorMessage("Error saving the drawing");
    } finally {
      setIsSaving(false);
    }
  };

  // Load the saved state when editor is ready
  useEffect(() => {
    if (!editor || !getDrawingQuery.data) return;

    try {
      const savedDrawing = getDrawingQuery.data;
      
      if (!savedDrawing?.content) {
        console.warn("No content found in saved drawing");
        return;
      }

      // Verify that the content has the necessary data
      if (!savedDrawing.content || typeof savedDrawing.content !== 'object') {
        console.warn("Invalid content format in saved drawing");
        return;
      }

      try {
        // Use the imported loadSnapshot function instead of editor.store.loadSnapshot
        loadSnapshot(editor.store, savedDrawing.content);
        console.log("Loaded snapshot using loadSnapshot from tldraw package");
      } catch (loadError) {
        console.error("Error loading snapshot:", loadError);
        setErrorMessage("Error loading saved drawing");
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
      setErrorMessage("Error processing saved drawing");
    }
  }, [editor, getDrawingQuery.data]);

  // Set up a listener for changes to the editor
  useEffect(() => {
    if (!editor) return;

    // Listen for changes to the document
    const unlisten = editor.store.listen(
      () => {
        // Save state whenever there's a change
        saveState();
      },
      { scope: "document", source: "user" }
    );

    // Clean up the listener when the component unmounts
    return () => {
      unlisten();
    };
  }, [editor]);

  return (
    <div className="relative w-full h-full">
      <Tldraw
        persistenceKey="whiteboard"
        onMount={(editor) => {
          setEditor(editor);
        }}
      />
      {isSaving && (
        <div className="absolute top-2 right-2 bg-white/80 px-3 py-1 rounded-md text-sm">
          Saving...
        </div>
      )}
      {errorMessage && (
        <div className="absolute top-2 left-2 bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm">
          {errorMessage}
          <button 
            className="ml-2 text-red-900 font-bold"
            onClick={() => setErrorMessage(null)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
