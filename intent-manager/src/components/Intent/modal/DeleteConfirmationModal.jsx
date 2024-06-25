import React from "react";
import Modal from "./Modal";

const DeleteConfirmationModal = ({ isOpen, name, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <Modal
      title="Confirm Delete"
      message={`Are you sure you want to delete the intent "${name}"?`}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default DeleteConfirmationModal;
