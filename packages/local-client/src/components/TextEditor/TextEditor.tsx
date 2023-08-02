import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef, useState } from "react";
import "./TextEditor.css";
import { Cell } from "../../state";
import { useActions } from "../../hooks/useActions";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const { updateCell } = useActions();
  const editHandler = (val: string) => {
    updateCell(cell.id, val);
  };

  useEffect(() => {
    if (!isEditing) return;
    const listener = (e: MouseEvent) => {
      if (ref.current && e.target && ref.current.contains(e.target as Node))
        return;

      setIsEditing(false);
    };
    document.addEventListener("click", listener, {
      capture: true,
    });
    return () => {
      document.removeEventListener("click", listener, {
        capture: true,
      });
    };
  }, [isEditing]);

  if (isEditing) {
    return (
      <div className='text-editor' ref={ref}>
        <MDEditor
          value={cell.content || "# Markdown"}
          onChange={(val) => editHandler(val || "")}
        />
      </div>
    );
  }

  return (
    <div
      className='text-editor card'
      style={{
        paddingTop: 16,
      }}
    >
      <button
        style={{}}
        onClick={() => setIsEditing(true)}
        className='button editBtn'
      >
        Edit
      </button>
      <div className='card-content'>
        <MDEditor.Markdown source={cell.content || "# Markdown"} />
      </div>
    </div>
  );
};

export default TextEditor;
