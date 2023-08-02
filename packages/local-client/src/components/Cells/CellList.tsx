import { useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CellListItem from "./CellListItem";
import styles from "./CellList.module.css";
import { useActions } from "../../hooks/useActions";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { data, order } }) =>
    order.map((id) => data[id])
  );
  const { fetchCells, saveCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  useEffect(() => {
    saveCells();
  }, []);

  return (
    <div className={`is-flex-direction-row ${styles.wrapper}`}>
      {cells.map((cell) => (
        <CellListItem cell={cell} key={cell.id} />
      ))}
    </div>
  );
};

export default CellList;
