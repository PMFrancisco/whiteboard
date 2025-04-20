import { useState } from "react";
import { useEditor } from "tldraw";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu } from "lucide-react";
import ToolsPanel from "./ToolsPanel";
import StylesPanel from "./StylesPanel";
import ImageUploader from "./ImageUploader";
import AIPanel from "./AIPanel";
import { useImageUploader } from "@/hooks/useImageUploader";
import { useDeleteKey } from "@/hooks/useDeleteKey";

export default function WhiteboardMenu() {
  const editor = useEditor();
  const [activeTab, setActiveTab] = useState("tools");
  const [isOpen, setIsOpen] = useState(false);
  const { fileInputRef, openFileDialog } = useImageUploader();

  // Use the delete key hook
  useDeleteKey(editor);

  return (
    <div className="absolute top-2 left-2 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" sideOffset={5}>
          <div className="p-4">
            <h3 className="text-lg font-medium mb-2">Whiteboard Tools</h3>
            <Separator className="my-2" />
            <Tabs defaultValue="tools" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-2">
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="styles">Styles</TabsTrigger>
                <TabsTrigger value="AI">AI</TabsTrigger>
              </TabsList>
              <TabsContent value="tools">
                <ToolsPanel openFileDialog={openFileDialog} />
              </TabsContent>
              <TabsContent value="styles">
                <StylesPanel />
              </TabsContent>
              <TabsContent value="AI">
                <AIPanel />
              </TabsContent>
            </Tabs>
          </div>
        </PopoverContent>
      </Popover>
      <ImageUploader fileInputRef={fileInputRef} onUpload={() => setIsOpen(false)} />
    </div>
  );
} 