import React from "react";
import PropTypes from "prop-types";

const Modal = ({ title, message, onConfirm, onCancel }) => (
  <div className="modal modal-open">
    <div className="modal-box">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="py-4">{message}</p>
      <div className="modal-action">
        <button className="btn" onClick={onCancel}>
          No
        </button>
        <button className="btn btn-primary" onClick={onConfirm}>
          Yes
        </button>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Modal;
