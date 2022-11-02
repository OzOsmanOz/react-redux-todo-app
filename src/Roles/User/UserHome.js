import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import actionTypes from "../../Redux/Action/actionTypes";
import UserTodoDelete from "./UserTodoDelete";

const UserHome = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { TodosState, LoginState } = useSelector((state) => state);
  // console.log("LoginState", LoginState);
  const { todo } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(todo);
  const [isAdd, setIsAdd] = useState(false);
  const [addTodo, setAddTodo] = useState(todo);
  // console.log("addTodo", addTodo);

  const UserTodos = TodosState.todos.filter(
    (todo) => todo.userId === LoginState.id
  );

  const editSave = () => {
    // console.log("editTodo", editTodo);
    axios
      .put(`http://localhost:3004/todos/${editTodo.id}`, editTodo)
      .then((resEditTodo) => {
        console.log("resEditTodo", resEditTodo);
        dispatch({ type: actionTypes.EDIT_TODO, payload: editTodo });
        setIsEdit(!isEdit);
      })
      .catch((err) => console.log("Edit Todo Err", err));
    navigate("/");
  };

  const addSave = () => {
    console.log("addTodo", addTodo);
    const newTodo = {
      id: String(new Date().getTime()),
      text: addTodo,
      isDone: false,
      // date: new Date(),
      date: new Date().toLocaleDateString(),
      userId: LoginState.id,
    };
    if (TodosState.todos.find((todo) => todo.text === newTodo.text)) {
      alert("There is a todo of the same name");
      return;
    }
    axios
      .post("http://localhost:3004/todos", newTodo)
      .then((resAddTodo) => {
        console.log("resAddTodo", resAddTodo);
        dispatch({ type: actionTypes.ADD_TODO, payload: resAddTodo.data });
        setAddTodo("");
        setIsAdd(false);
      })
      .catch((err) => console.log("Add Todo Err", err));
  };

  const changeIsDone = (id) => {
    const searchedTodo = TodosState.todos.find((todo) => todo.id === id);
    console.log("searchedTodo", searchedTodo);
    const updateTodo = {
      ...searchedTodo,
      isDone: !searchedTodo.isDone,
    };
    console.log("updateTodo", updateTodo);
    axios
      .put(`http://localhost:3004/todos/${updateTodo.id}`, updateTodo)
      .then((resIsDoneTodo) => {
        console.log("resIsDoneTodo", resIsDoneTodo);
        dispatch({
          type: actionTypes.EDIT_ISDONE,
          payload: resIsDoneTodo.data,
        });
      })
      .catch((err) => console.log("Edit Todo Err", err));
  };

  return (
    <div className="user-home container my-5">
      <h3 className="text-center fw-bold my-4" style={{ color: "#AA8B56" }}>
        {LoginState.username}
      </h3>
      <div className="text-center">
        <button
          onClick={() => {
            setIsAdd(true);
          }}
          style={{ backgroundColor: "#4E6C50" }}
          className="btn btn-sm btn-outline-light fw-bold w-25 mb-3"
        >
          Add Todo
        </button>
      </div>

      <h4 className="text-center fw-bold mb-4">Todo's</h4>

      {isAdd === true && (
        <div className="user-add-todo">
          <div className="input-group input-group-sm mb-3">
            <span
              className="input-group-text"
              id="inputGroup-sizing-sm"
              style={{ fontSize: "12px" }}
            >
              Todo
            </span>
            <input
              onChange={(e) => {
                setAddTodo(e.target.value);
              }}
              // defaultValue={addTodo}
              value={addTodo}
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
            />
            <button
              onClick={() => addSave(addTodo)}
              className="btn btn-sm btn-success"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {isEdit === true && (
        <button
          className="d-flex justify-content-center align-items-center "
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.4)",
            cursor: "default",
            zIndex: 111,
            border: "none",
          }}
        >
          <div
            className="text-center rounded-2"
            style={{ width: "75%", padding: "20px", backgroundColor: "#fff" }}
          >
            <div className="">
              <input
                onChange={(e) =>
                  setEditTodo({ ...editTodo, text: e.target.value })
                }
                value={editTodo.text}
                // defaultValue={editTodo.text}
                type="text"
                className="form-control py-0"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
              />
            </div>
            <div className="mt-3">
              <button
                onClick={() => setIsEdit(false)}
                className="btn btn-sm btn-outline-danger py-0 me-2"
              >
                Close
              </button>
              <button
                onClick={() => editSave()}
                className="btn btn-sm btn-outline-primary py-0"
              >
                Save
              </button>
            </div>
          </div>
        </button>
      )}

      {UserTodos.map((todo) => {
        return (
          <div key={todo.id} className="d-flex">
            <div
              className={`alert alert-${
                todo.isDone === true ? "success" : "secondary"
              } pt-4 pb-0 w-100`}
              role="alert"
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <p className="fw-bold me-3" style={{ fontSize: "12px" }}>
                    Todo Date :
                  </p>
                  <p style={{ fontSize: "12px" }}>{todo.date}</p>
                </div>
                <div className="d-flex">
                  <p className="fw-bold me-3" style={{ fontSize: "12px" }}>
                    Todo Id :
                  </p>
                  <p style={{ fontSize: "12px" }}>{todo.id}</p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <p style={{ fontSize: "14px" }}>{todo.text}</p>
                <div>
                  <button
                    onClick={() => changeIsDone(todo.id)}
                    className={`btn btn-sm btn-outline-${
                      todo.isDone === true ? "secondary" : "success"
                    } py-0`}
                  >
                    {todo.isDone === false ? "Done" : "Undone"}
                  </button>
                </div>
              </div>
            </div>
            <div className="alert alert-secondary d-flex flex-column justify-content-center align-items-center pt-3 pb-2 ms-3">
              <UserTodoDelete todo={todo} />

              <p
                onClick={() => {
                  setEditTodo(todo);
                  setIsEdit(true);
                }}
                className="fa-solid fa-pen-to-square text-success "
                style={{ cursor: "pointer", fontSize: "22px" }}
              ></p>
            </div>
          </div>
        );
      })}

      {/* {showModal === true && (
        <Modal
          title={`${deleteTextTodo}`}
          aciklama={"are you sure you want to delete?"}
          onConfirm={() => deleteTodo(deletedTodo)}
          onCancel={() => setShowModal(false)}
        />
      )} */}
    </div>
  );
};
export default UserHome;
