import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import actionTypes from "../../Redux/Action/actionTypes";
import Modal from "../../Components/Modal";

const UserTodoDelete = (props) => {
  const dispatch = useDispatch();
  const { todo } = props;

  const [deletedTodo, setDeletedTodo] = useState(todo);
  const [showModal, setShowModal] = useState(false);
  const [deleteTextTodo, setDeleteTextTodo] = useState("");

  const deleteTodo = (todo) => {
    console.log("deletedTodo", deletedTodo);
    axios
      .delete(`http://localhost:3004/todos/${todo.id}`, deletedTodo)
      .then((resTodoDelete) => {
        dispatch({
          type: actionTypes.DELETE_TODO,
          payload: deletedTodo,
        });
      })
      .catch((err) => console.log("Delete Todo Err", err));
  };
  return (
    <div className="user-todo-delete">
      <p
        onClick={() => {
          setDeletedTodo(todo);
          setDeleteTextTodo(todo.text);
          setShowModal(true);
        }}
        className="fa-regular fa-trash-can text-danger me-2 fa-2x"
        style={{ cursor: "pointer", fontSize: "22px" }}
      ></p>
      {showModal === true && (
        <Modal
          title={`${deleteTextTodo}`}
          aciklama={"are you sure you want to delete?"}
          onConfirm={() => deleteTodo(deletedTodo)}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default UserTodoDelete;
