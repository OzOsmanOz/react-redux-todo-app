import { createStore, combineReducers } from "redux";

import LoginReducer from "./Reducers/LoginReducer";
import UsersReducer from "./Reducers/UsersReducer";
import TodosReducer from "./Reducers/TodosReducer";

const rootReducer = combineReducers({
  LoginState: LoginReducer,
  UsersState: UsersReducer,
  TodosState: TodosReducer,
});

const store = createStore(rootReducer);

export default store;
