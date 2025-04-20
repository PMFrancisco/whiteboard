import { useEffect, useState } from "react";
import { useEditor } from "tldraw";
import {
  DefaultColorStyle,
  DefaultFillStyle,
  DefaultDashStyle,
  TLDefaultColorStyle,
  TLDefaultFillStyle,
  TLDefaultDashStyle,
} from "tldraw";
import { Button } from "@/components/ui/button";

export default function StylesPanel() {
  const editor = useEditor();
  
  // Style states to track current selections
  const [currentColor, setCurrentColor] = useState<TLDefaultColorStyle>("black");
  const [currentFill, setCurrentFill] = useState<TLDefaultFillStyle>("solid");
  const [currentDash, setCurrentDash] = useState<TLDefaultDashStyle>("draw");

  // Track current styles from the editor
  useEffect(() => {
    if (!editor) return;
    
    // Get initial styles
    const color = editor.getStyleForNextShape(DefaultColorStyle);
    const fill = editor.getStyleForNextShape(DefaultFillStyle);
    const dash = editor.getStyleForNextShape(DefaultDashStyle);
    
    if (color) setCurrentColor(color);
    if (fill) setCurrentFill(fill);
    if (dash) setCurrentDash(dash);
    
    // Subscribe to style changes
    const unsubscribe = editor.store.listen(() => {
      const newColor = editor.getStyleForNextShape(DefaultColorStyle);
      const newFill = editor.getStyleForNextShape(DefaultFillStyle);
      const newDash = editor.getStyleForNextShape(DefaultDashStyle);
      
      if (newColor) setCurrentColor(newColor);
      if (newFill) setCurrentFill(newFill);
      if (newDash) setCurrentDash(newDash);
    });
    
    return unsubscribe;
  }, [editor]);

  // Apply style to both selected shapes and for future shapes
  const applyStyle = (style: {
    color?: TLDefaultColorStyle;
    fill?: TLDefaultFillStyle;
    dash?: TLDefaultDashStyle;
  }) => {
    if (!editor) return;
    
    // Set style for next shapes (to be created)
    if (style.color) {
      editor.setStyleForNextShapes(DefaultColorStyle, style.color);
      setCurrentColor(style.color);
    }
    
    if (style.fill) {
      editor.setStyleForNextShapes(DefaultFillStyle, style.fill);
      setCurrentFill(style.fill);
    }
    
    if (style.dash) {
      editor.setStyleForNextShapes(DefaultDashStyle, style.dash);
      setCurrentDash(style.dash);
    }
    
    // Also apply to selected shapes if any are selected
    const selectedShapeIds = editor.getSelectedShapeIds();
    if (selectedShapeIds.length > 0) {
      if (style.color) {
        editor.setStyleForSelectedShapes(DefaultColorStyle, style.color);
      }
      
      if (style.fill) {
        editor.setStyleForSelectedShapes(DefaultFillStyle, style.fill);
      }
      
      if (style.dash) {
        editor.setStyleForSelectedShapes(DefaultDashStyle, style.dash);
      }
    }
  };

  return (
    <div className="space-y-3 mt-2">
      <div>
        <h3 className="text-sm font-medium mb-1">Fill</h3>
        <div className="grid grid-cols-4 gap-1">
          {['none', 'solid', 'semi', 'pattern'].map((fill) => (
            <Button
              key={fill}
              variant={currentFill === fill ? "default" : "outline"}
              className="h-8 capitalize"
              onClick={() => applyStyle({ fill: fill as TLDefaultFillStyle })}
            >
              {fill}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-1">Color</h3>
        <div className="grid grid-cols-7 gap-1">
          {['black', 'blue', 'green', 'red', 'orange', 'violet', 'yellow'].map((color) => (
            <Button
              key={color}
              variant={currentColor === color ? "default" : "outline"}
              className="h-8 w-8 p-0"
              style={{ 
                backgroundColor: color,
                border: currentColor === color ? "2px solid white" : undefined,
                boxShadow: currentColor === color ? "0 0 0 1px black" : undefined
              }}
              onClick={() => applyStyle({ color: color as TLDefaultColorStyle })}
            />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-1">Stroke</h3>
        <div className="grid grid-cols-4 gap-1">
          {['draw', 'solid', 'dashed', 'dotted'].map((dash) => (
            <Button
              key={dash}
              variant={currentDash === dash ? "default" : "outline"}
              className="h-8 capitalize"
              onClick={() => applyStyle({ dash: dash as TLDefaultDashStyle })}
            >
              {dash}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
} 