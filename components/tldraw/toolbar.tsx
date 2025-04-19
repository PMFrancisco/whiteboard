import { DefaultToolbar, DefaultToolbarContent, TldrawUiButton, TldrawUiButtonLabel, useEditor } from "tldraw";

export default function CustomToolbar() {
    const editor = useEditor();
  
    const handleModifyShape = () => {
      if (!editor) return;
      
      const selectedShapes = editor.getSelectedShapes();
      console.log(editor.getSelectedShapes()[0].props);
      if (selectedShapes.length === 0) {
        console.log("No shapes selected");
        return;
      }
  
      editor.updateShapes([
        {
          id: selectedShapes[0].id,
          type: selectedShapes[0].type,
          props: {
            fill: "solid",
            color: "green",
            geo: "check-box",
          },
        },
      ]);
    };
  
    return (
      <DefaultToolbar>
        <DefaultToolbarContent />
        <TldrawUiButton
          type="normal"
          onClick={handleModifyShape}
          disabled={!editor?.getSelectedShapes().length}
        >
          <TldrawUiButtonLabel>✅</TldrawUiButtonLabel>
        </TldrawUiButton>
      </DefaultToolbar>
    );
  }
  