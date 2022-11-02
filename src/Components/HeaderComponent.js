import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import actionTypes from "../Redux/Action/actionTypes";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: actionTypes.LOGIN_LOGOUT });
    window.localStorage.removeItem("loginState");
    navigate("/login");
  };
  return (
    <div className="header-component">
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#395144" }}
      >
        <div className="container">
          <Link to={"/"} className="navbar-brand fw-bold" href="#">
            My Todo's
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  to={"/"}
                  className="nav-link fw-bold active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/login"}
                  className="nav-link fw-bold active"
                  aria-current="page"
                  href="#"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/register"}
                  className="nav-link fw-bold active"
                  aria-current="page"
                  href="#"
                >
                  Register
                </Link>
              </li>
            </ul>
            <button
              onClick={handleLogout}
              type="button"
              className="btn btn-sm btn-outline-danger fw-bold"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default HeaderComponent;
