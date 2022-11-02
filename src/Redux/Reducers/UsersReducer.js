import actionTypes from "../Action/actionTypes";

const initialState = {
  start: false,
  success: false,
  users: [],
  fail: false,
  errorMessage: "",
};

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_START:
      return {
        ...state,
        start: true,
      };

    case actionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        start: false,
        success: true,
        users: action.payload,
      };

    case actionTypes.FETCH_USERS_FAIL:
      return {
        ...state,
        fail: true,
        errorMessage: action.payload,
      };

    case actionTypes.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case actionTypes.EDIT_USER:
      const filteredUser = state.users.filter(
        (user) => user.id !== action.payload.id
      );
      return {
        ...state,
        users: [...filteredUser, action.payload],
      };

    case actionTypes.DELETE_USER:
      const filteredDeleteUser = state.users.filter(
        (user) => user.id !== action.payload.id
      );
      return {
        ...state,
        users: [...filteredDeleteUser],
      };

    default:
      return state;
  }
};
export default UsersReducer;
