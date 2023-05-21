import React from "react";
import"./Modal.css"

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal z-10">
      <div className="fixed inset-0 bg-black opacity-25"></div>
      <div className="modal-content relative z-20">
        <button className="close-button text-black" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
