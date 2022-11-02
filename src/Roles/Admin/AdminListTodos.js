import React from "react";
import { useSelector } from "react-redux";

const AdminListTodos = () => {
  const { TodosState } = useSelector((state) => state);

  return (
    <div className="admin-list-todos container my-3">
      <div className="text-center"></div>

      <h4 className="text-center fw-bold mb-5">Todo's</h4>
      {TodosState.todos.map((todo) => {
        return (
          <div
            key={todo.id}
            className="alert alert-secondary pt-2 pb-0"
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
              <p className="" style={{ fontSize: "14px" }}>
                {todo.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default AdminListTodos;
