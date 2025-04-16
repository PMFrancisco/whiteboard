"use client";

import { Tldraw, getSnapshot } from "tldraw";
import "tldraw/tldraw.css";
import { useEffect, useState } from "react";
import { trpcClient } from "@/utils/trpc";

export default function WhiteboardPage() {
  const [editor, setEditor] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Function to save the current state
  const saveState = async () => {
    if (!editor) return;

    try {
      setIsSaving(true);

      // Get the snapshot directly
      const snapshot = getSnapshot(editor.store);
      
      console.log("Saving snapshot:", {
        hasSchemaVersion: 'schemaVersion' in snapshot,
        snapshotKeys: Object.keys(snapshot),
        fullSnapshot: snapshot
      });

      // Save the state using tRPC
      await trpcClient.drawing.saveDrawing.mutate({
        id: "whiteboard",
        content: snapshot,
      });

      console.log("Whiteboard state saved successfully");
    } catch (error) {
      console.error("Error saving whiteboard state:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Load the saved state when the component mounts
  useEffect(() => {
    const loadSavedState = async () => {
      if (!editor) return;

      try {
        const savedDrawing = await trpcClient.drawing.getDrawing.query(
          "whiteboard"
        );

        console.log("Received savedDrawing:", {
          hasContent: !!savedDrawing?.content,
          contentKeys: savedDrawing?.content ? Object.keys(savedDrawing.content) : [],
          fullContent: savedDrawing?.content
        });

        if (savedDrawing?.content) {
          try {
            console.log("Before loadSnapshot:", {
              hasSchemaVersion: 'schemaVersion' in savedDrawing.content,
              schemaVersion: savedDrawing.content.schemaVersion,
              currentSchemaVersion: editor.store.schema.serialize().schemaVersion
            });

            // Apply the saved state to the editor
            editor.store.loadSnapshot(savedDrawing.content);
            console.log("Loaded saved state successfully");
          } catch (loadError) {
            console.error("Error loading snapshot:", {
              error: loadError,
              savedContent: savedDrawing.content
            });
          }
        } else {
          console.warn("No content found in saved drawing");
        }
      } catch (error) {
        console.error("Error loading saved state:", error);
      }
    };

    if (editor) {
      console.log("Editor mounted:", {
        hasStore: !!editor.store,
        hasSchema: !!editor.store?.schema,
        schemaVersion: editor.store?.schema?.serialize()?.schemaVersion
      });
      loadSavedState();
    }
  }, [editor]);

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
          console.log("Tldraw onMount:", {
            hasStore: !!editor.store,
            hasSchema: !!editor.store?.schema,
            schemaVersion: editor.store?.schema?.serialize()?.schemaVersion
          });
          setEditor(editor);
        }}
      />
      {isSaving && (
        <div className="absolute top-2 right-2 bg-white/80 px-3 py-1 rounded-md text-sm">
          Saving...
        </div>
      )}
    </div>
  );
}
