"use client";

import { useEditor } from "tldraw";
import WhiteboardMenu from "./WhiteboardMenu";
import { useDeleteKey } from "@/hooks/useDeleteKey";

export default function CustomUi() {
  const editor = useEditor();
  useDeleteKey(editor);

  return (
    <WhiteboardMenu />
  );
} 