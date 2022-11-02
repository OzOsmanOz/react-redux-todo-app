import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import Roles from "../../Utils/Roles";
import actionTypes from "../../Redux/Action/actionTypes";
import Modal from "../../Components/Modal";

const AdminSingleUser = (props) => {
  const dispatch = useDispatch();
  const { user } = props;
  const [updatedUser, setUpdatedUser] = useState(user);
  const [deletedUser, setDeletedUser] = useState(user);
  const [showModal, setShowModal] = useState(false);
  const [deleteUsername, setDeleteUsername] = useState("");
  // console.log("deletedUser", deletedUser);

  const handleSave = () => {
    axios
      .put(`http://localhost:3004/users/${user.id}`, updatedUser)
      .then((resUpd) => {
        console.log("resUpd", resUpd);
        dispatch({ type: actionTypes.EDIT_USER, payload: updatedUser });
      })
      .catch((err) => console.log("UpdatedUser Err", err));
  };

  const deleteUser = (deletedUser) => {
    // const deletedUserTodos = TodosState.todos.filter(
    //   (todo) => todo.userId === user.id
    // );
    // console.log("deletedUserTodos", deletedUserTodos);
    console.log("deletedUser", deletedUser);
    axios
      .delete(`http://localhost:3004/users/${user.id}`, deletedUser)
      .then((resDelete) => {
        console.log("resDelete", resDelete);
        dispatch({ type: actionTypes.DELETE_USER, payload: deletedUser });
        setShowModal(false);
      })
      .catch((err) => console.log("Delete User Err", err));

    // axios
    //   .delete(`http://localhost:3004/todos/${user.id}`)
    //   .then((resDeleteUserTodos) => {
    //     console.log("resDeleteUserTodos", resDeleteUserTodos);
    //     // dispatch({ type: actionTypes.DELETE_USER_TODOS, payload: user.id });
    //     setShowModal(false);
    //   })
    //   .catch((err) => console.log("Delete User Todos Err", err));
  };

  return (
    <div className="admin-single-user container d-flex justify-content-between">
      <div
        key={user.id}
        className="alert alert-secondary pt-4 pb-1 w-100"
        role="alert"
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <p className="fw-bold me-3" style={{ fontSize: "12px" }}>
              User Id :
            </p>
            <p style={{ fontSize: "12px" }}>{user.id}</p>
          </div>
          <div className="d-flex ">
            <p className="fw-bold me-3" style={{ fontSize: "12px" }}>
              User Role :
            </p>

            <p style={{ fontSize: "12px" }}>{user.role}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <p className="fw-bold me-3" style={{ fontSize: "12px" }}>
              User :
            </p>
            <p className="text-center" style={{ fontSize: "15px" }}>
              {user.username}
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <select
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, role: e.target.value })
              }
              defaultValue={updatedUser.role}
              className="form-select form-select-sm mb-3 w-100"
              aria-label=".form-select-sm example"
            >
              {Roles.map((role) => {
                return (
                  <option
                    key={role}
                    value={role}
                    className="border-0 rounded-2"
                  >
                    {role}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="alert alert-secondary d-flex flex-column justify-content-center align-items-center pt-4 pb-1 ms-3">
        <p
          onClick={() => {
            // deleteUser(deletedUser);
            setDeletedUser(user);
            setDeleteUsername(user.username);
            setShowModal(true);
          }}
          className="fa-regular fa-trash-can text-danger "
          style={{ cursor: "pointer", fontSize: "22px" }}
        ></p>
        {updatedUser.role !== user.role && (
          <div>
            <p
              onClick={handleSave}
              className="fa-solid fa-floppy-disk text-success"
              style={{ cursor: "pointer", fontSize: "22px" }}
            ></p>
          </div>
        )}
      </div>
      {showModal === true && (
        <Modal
          title={`${deleteUsername}`}
          aciklama={"Are you sure you want to delete the user?"}
          onConfirm={() => deleteUser(deletedUser)}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
export default AdminSingleUser;
