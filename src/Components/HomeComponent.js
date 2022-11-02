import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserHome from "../Roles/User/UserHome";
import AdminHome from "../Roles/Admin/AdminHome";

const HomeComponent = () => {
  const navigate = useNavigate();
  const { LoginState } = useSelector((state) => state);
  // console.log("LoginState", LoginState);

  useEffect(() => {
    if (!LoginState.isLogin) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="home-component container">
      {LoginState.role === "user" && <UserHome />}
      {LoginState.role === "admin" && <AdminHome />}
    </div>
  );
};
export default HomeComponent;
