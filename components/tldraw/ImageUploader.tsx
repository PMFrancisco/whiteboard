import { useRef } from "react";
import { useEditor, AssetRecordType } from "tldraw";

interface ImageUploaderProps {
  fileInputRef?: React.RefObject<HTMLInputElement | null>;
  onUpload?: () => void;
}

export default function ImageUploader({ fileInputRef: externalRef, onUpload }: ImageUploaderProps) {
  const editor = useEditor();
  const internalRef = useRef<HTMLInputElement>(null);
  const ref = externalRef || internalRef;

  // Load an image and insert it centered in the canvas
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      const img = new window.Image();
      img.onload = () => {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const assetId = AssetRecordType.createId();

        // Create asset in memory
        editor.createAssets([
          {
            id: assetId,
            type: "image",
            typeName: "asset",
            props: {
              name: file.name,
              src,
              w,
              h,
              mimeType: file.type,
              isAnimated: false,
            },
            meta: {},
          },
        ]);
        const x = (window.innerWidth - w) / 2;
        const y = (window.innerHeight - h) / 2;

        // Insert shape with the created asset
        editor.createShape({
          type: "image",
          x,
          y,
          props: { assetId, w, h },
        });
        
        if (onUpload) onUpload();
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <input
      ref={ref}
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleFileUpload}
    />
  );
}

// Hook para manejar la selección de imagen
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