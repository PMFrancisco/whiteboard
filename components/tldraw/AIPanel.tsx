import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useImageGeneration } from "@/hooks/useImageGeneration";

export default function AIPanel() {
  const { prompt, setPrompt, isLoading, handleGenerate } = useImageGeneration();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && prompt.trim()) {
        handleGenerate();
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="prompt">Describe the image you want to generate</Label>
        <Textarea
          id="prompt"
          placeholder="A happy dog playing with a ball"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[100px] resize-y"
        />
      </div>
      <Button 
        className="w-full" 
        onClick={handleGenerate}
        disabled={isLoading || !prompt.trim()}
      >
        {isLoading ? "Generating..." : "Generate Image"}
      </Button>
    </div>
  );
} 