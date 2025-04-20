import { useRef } from "react";

export function useImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };
  
  return {
    fileInputRef,
    openFileDialog
  };
} 