/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Tldraw, getSnapshot, loadSnapshot, Editor, TLStoreSnapshot } from "tldraw";
import "tldraw/tldraw.css";
import { useEffect, useState, useCallback } from "react";
import { trpc } from "@/utils/trpc";
import { useParams } from "next/navigation";
import CustomUi from "@/components/tldraw/customUi";

export default function DynamicWhiteboardPage() {
  const params = useParams();
  const uuid = params.uuid as string;
  const [editor, setEditor] = useState<Editor | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize tRPC mutation for saving drawing state
  const saveDrawingMutation = trpc.drawing.saveDrawing.useMutation();
  
  // Query to fetch existing drawing data
  const getDrawingQuery = trpc.drawing.getDrawing.useQuery(uuid, {
    enabled: !!uuid,
    refetchOnWindowFocus: false,
  });

  // Verificar si el whiteboard existe
  useEffect(() => {
    if (getDrawingQuery.isError || (getDrawingQuery.data === null && !getDrawingQuery.isLoading)) {
      setErrorMessage("Este whiteboard no existe o no tienes acceso a él");
    }
    setIsLoading(false);
  }, [getDrawingQuery.isError, getDrawingQuery.data, getDrawingQuery.isLoading]);

  // Function to save the current state
  const saveState = useCallback(async () => {
    if (!editor || !uuid) return;

    try {
      setIsSaving(true);
      setErrorMessage(null);
      const snapshot = getSnapshot(editor.store);
      
      if (!('schemaVersion' in snapshot)) {
        (snapshot as any).schemaVersion = 1;
      }
      
      await saveDrawingMutation.mutateAsync({
        id: uuid,
        content: snapshot as any,
      });

      console.log("Whiteboard state saved successfully");
    } catch (error) {
      console.error("Error in saveState:", error);
      setErrorMessage("Error saving the drawing");
    } finally {
      setIsSaving(false);
    }
  }, [editor, uuid, saveDrawingMutation, setIsSaving, setErrorMessage]);

  // Load the saved state when editor is ready
  useEffect(() => {
    if (!editor || !getDrawingQuery.data) return;

    try {
      const savedDrawing = getDrawingQuery.data;
      
      if (!savedDrawing?.content) {
        console.warn("No content found in saved drawing");
        return;
      }

      if (!savedDrawing.content || typeof savedDrawing.content !== 'object') {
        console.warn("Invalid content format in saved drawing");
        return;
      }

      try {
        const documentContent = savedDrawing.content.document as unknown as TLStoreSnapshot;
        if (!documentContent || typeof documentContent !== 'object') {
          throw new Error('Invalid document content');
        }
        loadSnapshot(editor.store, documentContent);
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

    const unlisten = editor.store.listen(
      () => {
        saveState();
      },
      { scope: "document", source: "user" }
    );

    return () => {
      unlisten();
    };
  }, [editor, uuid, saveState]);

  return (
    <div className="relative w-full h-full">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-lg">Cargando...</div>
        </div>
      ) : errorMessage ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-lg text-red-600">{errorMessage}</div>
        </div>
      ) : (
        <>
          <Tldraw
            persistenceKey={`whiteboard-${uuid}`}
            onMount={(editor) => {
              setEditor(editor);
            }}
            hideUi
          >
            <CustomUi />
          </Tldraw>
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
        </>
      )}
    </div>
  );
}