import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import styles from "./ActionBar.module.css";

interface ActionBarProps {
  id: string;
}

const ActionBar = ({ id }: ActionBarProps) => {
  const { moveCell, deleteCell } = useActions();
  const cells = useTypedSelector((state) => state.cells.order);
  const upHandler = () => {
    moveCell(id, "up");
  };
  const downHandler = () => {
    moveCell(id, "down");
  };
  const deleteHandler = () => {
    if (cells.length === 1)
      return alert("Must have at least one editor present");
    deleteCell(id);
  };
  return (
    <div className={styles.wrapper}>
      <button onClick={upHandler} className='button'>
        &uarr;
      </button>
      <button onClick={downHandler} className='button'>
        &darr;
      </button>
      <button onClick={deleteHandler} className='button is-danger'>
        &#10005;
      </button>
    </div>
  );
};

export default ActionBar;
