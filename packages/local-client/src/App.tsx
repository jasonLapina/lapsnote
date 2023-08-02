import "bulmaswatch/superhero/bulmaswatch.min.css";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/Cells/CellList";
import styles from "./App.module.css";

function App() {
  return (
    <Provider store={store}>
      <div className={styles.wrapper}>
        <CellList />
      </div>
    </Provider>
  );
}

export default App;
