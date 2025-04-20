import { useEffect } from "react";
import { Editor } from "tldraw";

export function useDeleteKey(editor: Editor | null) {
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
} 