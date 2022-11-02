import React, { useState } from "react";
import { useSelector } from "react-redux";

import AdminListUsers from "./AdminListUsers";
import AdminListTodos from "./AdminListTodos";

const AdminHome = () => {
  const { LoginState } = useSelector((state) => state);
  const [selectedButton, setSelectedButton] = useState("Users");
  return (
    <div className="admin-home container d-flex flex-column justify-content-center align-items-center my-4">
      <h4 className="fw-bold" style={{ color: "#AA8B56" }}>
        {LoginState.username}
      </h4>

      <div className="my-3">
        <button
          onClick={(e) => setSelectedButton("Todos")}
          className="btn btn-sm btn-success me-2"
          style={{ backgroundColor: "#4E6C50" }}
        >
          Todo's
        </button>
        <button
          onClick={(e) => setSelectedButton("Users")}
          className="btn btn-sm btn-success"
          style={{ backgroundColor: "#4E6C50" }}
        >
          User's
        </button>
      </div>
      {selectedButton === "Users" && <AdminListUsers />}
      {selectedButton === "Todos" && <AdminListTodos />}
    </div>
  );
};
export default AdminHome;
