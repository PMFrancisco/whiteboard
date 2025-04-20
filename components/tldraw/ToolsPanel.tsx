import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Pointer, 
  Hand, 
  Pen, 
  Eraser, 
  Square, 
  Type, 
  Minus, 
  ArrowRight, 
  Image 
} from "lucide-react";
import { useEditor, useValue, exportAs } from "tldraw";

interface ToolsPanelProps {
  openFileDialog: () => void;
}

export default function ToolsPanel({ openFileDialog }: ToolsPanelProps) {
  const editor = useEditor();
  
  // Active tool mode state
  const currentTool = useValue(
    "current tool",
    () => editor?.getCurrentToolId(),
    [editor]
  );

  // Define common tools
  const tools = [
    { id: "select", icon: <Pointer className="h-5 w-5" />, label: "Select" },
    { id: "hand", icon: <Hand className="h-5 w-5" />, label: "Hand" },
    { id: "draw", icon: <Pen className="h-5 w-5" />, label: "Draw" },
    { id: "eraser", icon: <Eraser className="h-5 w-5" />, label: "Eraser" },
    { id: "geo", icon: <Square className="h-5 w-5" />, label: "Shapes" },
    { id: "text", icon: <Type className="h-5 w-5" />, label: "Text" },
    { id: "line", icon: <Minus className="h-5 w-5" />, label: "Line" },
    { id: "arrow", icon: <ArrowRight className="h-5 w-5" />, label: "Arrow" },
    { action: openFileDialog, icon: <Image className="h-5 w-5" aria-label="Upload image" />, label: "Image" },
  ];

  // Handle tool selection
  const handleToolSelect = (toolId: string) => {
    if (!editor) return;
    editor.selectNone();
    editor.setCurrentTool(toolId);
  };

  // Handle export
  const handleExport = async () => {
    if (!editor) return;
    
    try {
      const shapes = editor.getCurrentPageShapes();
      const shapeIds = shapes.map(shape => shape.id);
      const svgResult = await editor.getSvgElement(shapeIds);
      
      if (!svgResult) {
        throw new Error('Failed to generate SVG');
      }
      
      const svgString = new XMLSerializer().serializeToString(svgResult.svg);
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.download = 'whiteboard-export.svg';
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting image:", error);
    }
  };

  return (
    <div className="space-y-3 mt-2">
      <div className="grid grid-cols-3 gap-1">
        {tools.map((tool) => (
          <Button
            key={tool.id || tool.label}
            variant={tool.id && currentTool === tool.id ? "default" : "outline"}
            onClick={() => {
              if (tool.id) {
                handleToolSelect(tool.id);
              } else tool.action?.();
            }}
            className="flex flex-col items-center justify-center py-2 h-16"
            title={tool.label}
          >
            {tool.icon}
            <span className="text-xs mt-1">{tool.label}</span>
          </Button>
        ))}
      </div>
      <Separator className="my-2" />
      <div className="space-y-2">
        <Button onClick={handleExport} className="w-full">
          Export as SVG
        </Button>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => editor?.undo()} 
            disabled={!editor}
            className="flex-1"
          >
            Undo
          </Button>
          <Button 
            variant="outline" 
            onClick={() => editor?.redo()} 
            disabled={!editor}
            className="flex-1"
          >
            Redo
          </Button>
        </div>
      </div>
    </div>
  );
} 