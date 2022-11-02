import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import actionTypes from "../Redux/Action/actionTypes";

const RegisterComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { UsersState } = useSelector((state) => state);
  const [formValueRegister, setFormValueRegister] = useState({
    username: "",
    password: "",
  });
  //   console.log("formValueRegister", formValueRegister);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formValueRegister.username || !formValueRegister.password) {
      alert("You must enter username and password");
      return;
    }
    const hasUserRegister = UsersState.users.find(
      (user) => user.username === formValueRegister.username
    );
    // console.log("hasUserRegister", hasUserRegister);
    if (hasUserRegister) {
      alert("Enter another username");
      return;
    }
    const newUser = {
      id: String(new Date().getTime()),
      username: formValueRegister.username,
      password: formValueRegister.password,
      role: "user",
    };
    axios
      .post("http://localhost:3004/users", newUser)
      .then((resUser) => {
        dispatch({ type: actionTypes.ADD_USER, payload: newUser });
        navigate("/login");
      })
      .catch((err) => console.log("Add User Err", err));
  };

  return (
    <div className="register-component container my-5 d-flex justify-content-center">
      <form
        onSubmit={handleRegister}
        style={{
          width: "350px",
          height: "400px",
          backgroundColor: "#4E6C50",
        }}
        className="rounded-4 shadow-lg form-control-sm"
      >
        <h3 className="text-white text-center fw-bold my-5"> Register</h3>
        <div className="form-floating mb-3 mt-5 d-flex justify-content-center">
          <input
            onChange={(e) =>
              setFormValueRegister({
                ...formValueRegister,
                username: e.target.value,
              })
            }
            value={formValueRegister.username}
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
              setFormValueRegister({
                ...formValueRegister,
                password: e.target.value,
              })
            }
            value={formValueRegister.password}
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
              className="btn btn-outline-light fw-bold my-5 w-50"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default RegisterComponent;
