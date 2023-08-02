import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import { useRef } from "react";
import styles from "./Editor.module.css";

import codeShift from "jscodeshift";
import Highlighter from "monaco-jsx-highlighter";

interface CodeEditorProps {
  initalValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initalValue, onChange }) => {
  const editorRef = useRef<any>(null);

  const onMount: EditorDidMount = (getVal, editor) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      onChange(getVal());
      editor.getModel()?.updateOptions({ tabSize: 2 });
      const highlighter = new Highlighter(
        // @ts-ignore
        window.monaco,
        codeShift,
        editor
      );
      highlighter.highLightOnDidChangeModelContent(
        () => {},
        () => {},
        undefined,
        () => {}
      );
    });
  };

  return (
    <div className={styles.container}>
      <MonacoEditor
        height={"100%"}
        width={"100%"}
        editorDidMount={onMount}
        value={initalValue}
        theme='dark'
        language='javascript'
        options={{
          wordWrap: "on",
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          minimap: {
            enabled: false,
          },
        }}
      />
    </div>
  );
};

export default CodeEditor;
