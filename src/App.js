import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import actionTypes from "./Redux/Action/actionTypes";
import HomePage from "./Page/HomePage";
import LoginPage from "./Page/LoginPage";
import RegisterPage from "./Page/RegisterPage";

function App() {
  const [isData, setIsData] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const localStorege = window.localStorage.getItem("loginState");
    if (!localStorege) {
      const state = {
        isLogin: false,
        id: "",
        username: "",
        role: "",
      };
      window.localStorage.setItem("loginState", JSON.stringify(state));
    } else {
      const formLocalStorage = JSON.parse(localStorege);
      dispatch({
        type: actionTypes.LOGIN_FORM_CHECK,
        payload: formLocalStorage,
      });
    }
    dispatch({ type: actionTypes.FETCH_USERS_START });
    axios
      .get("http://localhost:3004/users")
      .then((resUsers) => {
        dispatch({
          type: actionTypes.FETCH_USERS_SUCCESS,
          payload: resUsers.data,
        });
      })
      .catch((err) => {
        console.log("Users Err", err);
        dispatch({
          type: actionTypes.FETCH_USERS_FAIL,
          payload: "Error loading users",
        });
      });

    dispatch({ type: actionTypes.FETCH_TODOS_START });

    axios
      .get("http://localhost:3004/todos")
      .then((resTodos) => {
        dispatch({
          type: actionTypes.FETCH_TODOS_SUCCESS,
          payload: resTodos.data,
        });
      })
      .catch((err) => {
        console.log("Todos Err", err);
      });
    dispatch({
      type: actionTypes.FETCH_TODOS_FAIL,
      payload: "Error loading todos.",
    });

    setIsData(true);
  }, []);

  if (!isData) return null;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
