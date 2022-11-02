import React from "react";

const Modal = (props) => {
  const { onCancel, onConfirm, title, aciklama } = props;

  return (
    <button
      onClick={onCancel}
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
        style={{ width: "50%", padding: "20px", backgroundColor: "#fff" }}
      >
        <h3 className="fw-bold text-danger" style={{ fontSize: "15px" }}>
          {title}
        </h3>
        <p style={{ fontSize: "13px" }}>{aciklama}</p>
        <div>
          <button
            onClick={onCancel}
            className="btn btn-sm btn-outline-danger py-0 me-2"
          >
            Close
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-sm btn-outline-primary py-0"
          >
            Approve
          </button>
        </div>
      </div>
    </button>
  );
};
export default Modal;
