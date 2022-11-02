import actionTypes from "../Action/actionTypes";

const initialState = {
  start: false,
  success: false,
  todos: [],
  fail: false,
  errorMessage: "",
};

const TodosReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TODOS_START:
      return {
        ...state,
        start: true,
      };
    case actionTypes.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        start: false,
        success: true,
        todos: action.payload,
      };
    case actionTypes.FETCH_TODOS_FAIL:
      return {
        ...state,
        fail: true,
        errorMessage: action.payload,
      };
    case actionTypes.DELETE_TODO:
      const filteredDeleteTodo = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      // console.log("filteredDeleteTodo", filteredDeleteTodo);
      return {
        ...state,
        todos: [...filteredDeleteTodo],
      };
    case actionTypes.EDIT_TODO:
      const filteredEditTodo = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      // console.log("filteredEditTodo", filteredEditTodo);
      return {
        ...state,
        todos: [...filteredEditTodo, action.payload],
      };
    case actionTypes.ADD_TODO:
      const filteredAddTodo = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      // console.log("filteredEditTodo", filteredEditTodo);
      return {
        ...state,
        todos: [...filteredAddTodo, action.payload],
      };
    case actionTypes.EDIT_ISDONE:
      const filteredEditIsDone = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      console.log("filteredEditIsDone", filteredEditIsDone);
      return {
        ...state,
        // todos: [...filteredEditIsDone, action.payload],
        todos: [action.payload, ...filteredEditIsDone],
      };
    // case actionTypes.DELETE_USER_TODOS:
    //   const filterDeleteUserTodos = state.todos.filter(
    //     (todo) => todo.userId !== action.payload.id
    //   );
    //   return {
    //     ...state,
    //     todos: [...filterDeleteUserTodos],
    //   };

    default:
      return state;
  }
};
export default TodosReducer;
