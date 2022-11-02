import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import actionTypes from "../Redux/Action/actionTypes";

const LoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { UsersState } = useSelector((state) => state);
  // console.log("UsersState", UsersState);
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });
  // console.log("formValue", formValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.username || !formValue.password) {
      alert("You must enter username and password");
      return;
    }
    const hasUser = UsersState.users.find(
      (user) => user.username === formValue.username
    );
    // console.log("hasUser", hasUser);

    if (!hasUser) {
      alert("Username does not match");
      return;
    }
    if (hasUser.password !== formValue.password) {
      alert("Password does not match");
      return;
    }

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: {
        isLogin: true,
        username: hasUser.username,
        id: hasUser.id,
        role: hasUser.role,
      },
    });
    window.localStorage.setItem(
      "loginState",
      JSON.stringify({
        isLogin: true,
        username: hasUser.username,
        id: hasUser.id,
        role: hasUser.role,
      })
    );
    navigate("/");
  };

  return (
    <div className="login-component container my-5 d-flex justify-content-center">
      <form
        onSubmit={handleSubmit}
        style={{
          width: "350px",
          height: "400px",
          backgroundColor: "#4E6C50",
        }}
        className="rounded-4 shadow-lg form-control-sm"
      >
        <h3 className="text-white text-center fw-bold my-5"> Login</h3>
        <div className="form-floating mb-3 mt-5 d-flex justify-content-center">
          <input
            onChange={(e) =>
              setFormValue({ ...formValue, username: e.target.value })
            }
            value={formValue.username}
            type="text"
            className="form-control w-75"
            id="floatingInput"
            placeholder="Username"
          />
          <label className="text-center" htmlFor="floatingInput">
            Username
          </label>
        </div>
        <div className="form-floating d-flex justify-content-center">
          <input
            onChange={(e) =>
              setFormValue({ ...formValue, password: e.target.value })
            }
            value={formValue.password}
            type="password"
            className="form-control w-75"
            id="floatingPassword"
            placeholder="Password"
          />
          <label className="text-center" htmlFor="floatingPassword">
            Password
          </label>
        </div>
        <div className="text-center">
          <div className="d-flex flex-column align-items-center">
            <button
              type="submit"
              className="btn btn-outline-light fw-bold my-4 w-50"
            >
              Signup
            </button>
            <Link
              to={"/register"}
              className="fw-bold text-warning"
              style={{ color: "#AA8B56" }}
            >
              Click to Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default LoginComponent;
