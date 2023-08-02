import { Cell } from "../../state";
import ActionBar from "../ActionBars/ActionBar";
import AddCell from "../AddCell/AddCell";
import CodeCell from "../CodeCell/CodeCell";
import TextEditor from "../TextEditor/TextEditor";

interface CellItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === "code") child = <CodeCell cell={cell} />;
  else child = <TextEditor cell={cell} />;

  return (
    <div key={cell.id}>
      <div style={{ marginBottom: 48 }}>
        <ActionBar id={cell.id} />
        {child}
      </div>
      <AddCell cellId={cell.id} />
    </div>
  );
};

export default CellListItem;
