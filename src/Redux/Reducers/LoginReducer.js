import actionTypes from "../Action/actionTypes";

const initialState = {
  isLogin: false,
  id: "",
  username: "",
  role: "",
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_FORM_CHECK:
      return {
        isLogin: action.payload.isLogin,
        id: action.payload.id,
        username: action.payload.username,
        role: action.payload.role,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        isLogin: action.payload.isLogin,
        id: action.payload.id,
        username: action.payload.username,
        role: action.payload.role,
      };
    case actionTypes.LOGIN_LOGOUT:
      return initialState;

    default:
      return state;
  }
};
export default LoginReducer;
