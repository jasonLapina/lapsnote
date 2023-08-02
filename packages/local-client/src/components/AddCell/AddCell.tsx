import { useActions } from "../../hooks/useActions";
import { CellType } from "../../state";
import styles from "./AddCell.module.css";

interface AddCellProps {
  cellId: string;
}

const AddCell = ({ cellId }: AddCellProps) => {
  const { insertCellBefore } = useActions();
  const addHandler = (type: CellType) => {
    insertCellBefore(cellId, type);
  };
  return (
    <div className={styles.wrapper}>
      <button onClick={() => addHandler("code")} className='button'>
        <span
          style={{
            fontSize: 32,
            marginRight: 4,
          }}
        >
          +
        </span>
        code
      </button>
      <button onClick={() => addHandler("text")} className='button'>
        <span
          style={{
            fontSize: 32,
            marginRight: 4,
          }}
        >
          +
        </span>
        text
      </button>
    </div>
  );
};
export default AddCell;
