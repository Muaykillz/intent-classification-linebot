import React from "react";
import Modal from "./Modal";

const UnsavedChangesModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <Modal
      title="Unsaved Changes"
      message="You have unsaved changes. Are you sure you want to discard them?"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default UnsavedChangesModal;
