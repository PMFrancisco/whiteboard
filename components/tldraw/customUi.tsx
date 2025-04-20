"use client";

import { useEffect } from "react";
import { useEditor } from "tldraw";
import WhiteboardMenu from "./WhiteboardMenu";

export default function CustomUi() {
  const editor = useEditor();

  // Delete selected shapes when Delete key is pressed
  useEffect(() => {
    if (!editor) return;
    
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        editor.deleteShapes(editor.getSelectedShapeIds());
      }
    };
    
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editor]);

  return (
    <WhiteboardMenu />
  );
} 