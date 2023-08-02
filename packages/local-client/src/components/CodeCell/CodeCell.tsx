import { useEffect } from "react";
import Frame from "../Frame/Frame";
import CodeEditor from "../CodeEditor/CodeEditor";
import styles from "./CodeCell.module.css";
import Resizable from "../Resizable/Resizable";
import { Cell } from "../../state";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const initInput = `// import React from 'react';
// import ReactDOM from 'react-dom/client';

// const App = () => {
//   return <h1>hello, world!</h1>;
// };

// const root = ReactDOM.createRoot(
//   document.getElementById("root")
// );
// root.render(<App />);

`;

interface CodeCellProps {
  cell: Cell;
}

function CodeCell({ cell }: CodeCellProps) {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundle[cell.id]);
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    const combined = orderedCells.map((item) => {
      if (item.type === "text") return null;
      else return item.content;
    });
    return combined.join(";\n");
  });

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cell.content);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, createBundle]);

  return (
    <Resizable direction='vertical'>
      <div className={styles.innerContainer}>
        <Resizable direction='horizontal'>
          <CodeEditor
            onChange={(value) => updateCell(cell.id, value)}
            initalValue={initInput}
          />
        </Resizable>
        <div className={styles.progressWrapper}>
          {!bundle || bundle.loading ? (
            <progress className='progress is-primary is-small' max='100'>
              Loading
            </progress>
          ) : (
            <Frame code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
}

export default CodeCell;
