import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { AssetRecordType, useEditor } from "tldraw";

export function useImageGeneration() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const editor = useEditor();

  const generateImage = trpc.openAI.generateImage.useMutation({
    onSuccess: (data) => {
      setIsLoading(false);
      if (editor && data.url) {
        const assetId = AssetRecordType.createId();
        const imageWidth = 400;
        const imageHeight = 400;

        // Create the image asset
        editor.createAssets([
          {
            id: assetId,
            type: "image",
            typeName: "asset",
            props: {
              name: prompt,
              src: data.url,
              w: imageWidth,
              h: imageHeight,
              mimeType: "image/png",
              isAnimated: false,
            },
            meta: {},
          },
        ]);

        // Calculate center position
        const x = (window.innerWidth - imageWidth) / 2;
        const y = (window.innerHeight - imageHeight) / 2;

        // Create the image shape
        editor.createShape({
          type: "image",
          x,
          y,
          props: {
            assetId,
            w: imageWidth,
            h: imageHeight,
          },
        });

        setPrompt("");
      }
    },
    onError: (error) => {
      setIsLoading(false);
      console.error("Error generating image:", error);
    },
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    generateImage.mutate({ prompt });
  };

  return {
    prompt,
    setPrompt,
    isLoading,
    handleGenerate,
  };
} 