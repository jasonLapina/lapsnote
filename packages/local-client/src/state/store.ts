import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { ActionType } from "./action-types";
import { persistMiddleware } from "./middelware/persistMiddleware";

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddleware, thunk)
);

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "text",
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "code",
  },
});
// store.dispatch({
//   type: ActionType.INSERT_CELL_BEFORE,
//   payload: {
//     id: null,
//     type: "code",
//   },
// });
