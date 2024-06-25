import React, { useState, useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import IntentHeader from "./IntentHeader";
import IntentBody from "./IntentBody";
import AlertMessage from "../alert/AlertMessage";
import DeleteConfirmationModal from "../modal/DeleteConfirmationModal";
import UnsavedChangesModal from "../modal/UnsavedChangesModal";

const IntentItem = ({ intent, onDelete, onSave }) => {
  const [isChanged, setIsChanged] = useState(false);
  const [isOpen, setIsOpen] = useState(intent.isNew || false);
  const [isTrainingOpen, setIsTrainingOpen] = useState(true);
  const [examples, setExamples] = useState(intent.examples);
  const [response, setResponse] = useState(intent.response);
  const [name, setName] = useState(intent.name);
  const [isEditingName, setIsEditingName] = useState(intent.isNew || false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closeAction, setCloseAction] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const nameInputRef = useRef(null);

  const [isNameValid, setIsNameValid] = useState(true);
  const [areExamplesValid, setAreExamplesValid] = useState(true);
  const [isResponseValid, setIsResponseValid] = useState(true);
  const [hasAttemptedSave, setHasAttemptedSave] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  const handleToggle = () => {
    console.log("isChanged", isChanged);
    if (isChanged) {
      setCloseAction("collapse");
      setIsModalOpen(true);
    } else if (isEditingName) {
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleTrainingToggle = () => {
    if (isChanged) {
      setCloseAction("training");
      setIsModalOpen(true);
    } else {
      setIsTrainingOpen(!isTrainingOpen);
    }
  };

  const handleAddExample = useCallback(
    (example) => {
      setExamples([...examples, example]);
      setIsChanged(true);
    },
    [examples],
  );

  const handleUpdateExample = useCallback(
    (idx, value) => {
      const newExamples = [...examples];
      newExamples[idx] = value;
      setExamples(newExamples);
      setIsChanged(true);
    },
    [examples],
  );

  const handleDeleteExample = useCallback(
    (idx) => {
      const newExamples = [...examples];
      newExamples.splice(idx, 1);
      setExamples(newExamples);
      setIsChanged(true);
    },
    [examples],
  );

  const handleResponseChange = useCallback((event) => {
    setResponse(event.target.value);
    setIsChanged(true);
  }, []);

  const handleSave = () => {
    setHasAttemptedSave(true);

    const validations = [
      {
        condition: !name,
        message: "Intent name is required!",
        setIsValid: setIsNameValid,
      },
      {
        condition: examples.length === 0,
        message: "At least one training phrase is required!",
        setIsValid: setAreExamplesValid,
      },
      {
        condition: !response,
        message: "Response is required!",
        setIsValid: setIsResponseValid,
      },
    ];

    console.log("examples", examples);

    for (const { condition, message, setIsValid } of validations) {
      if (condition) {
        setIsValid(false);
        return;
      } else {
        setIsValid(true);
      }
    }

    // Mock saving logic
    const success = true; // Change to false to simulate a failure

    if (success) {
      setIsChanged(false);
      setIsEditingName(false);
      setIsOpen(true); // Ensure collapse stays open after saving
      setHasSaved(true);

      if (intent.isNew) {
        onSave({
          ...intent,
          name,
          examples,
          response,
          isNew: true,
        });
      } else {
        onSave({ ...intent, name, examples, response });
      }
    }
  };

  const handleDelete = () => {
    setCloseAction("delete");
    setIsModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    onDelete(intent.name);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    if (closeAction === "delete") {
      setIsDeleteModalOpen(true);
    } else {
      setIsChanged(false);
      if (closeAction === "collapse") {
        setIsOpen(!isOpen);
      } else if (closeAction === "training") {
        setIsTrainingOpen(!isTrainingOpen);
      }
    }
    setCloseAction(null);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setCloseAction(null);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setIsChanged(true);
  };

  const handleNameEditToggle = () => {
    setIsEditingName(!isEditingName);
  };

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditingName]);

  useEffect(() => {
    if (hasSaved) {
      setHasSaved(false);
    }
  }, [hasSaved]);

  return (
    <div>
      <div
        className={`collapse collapse-arrow rounded-xl border-2 border-base-200 ${isOpen ? "open" : ""}`}
      >
        <input
          type="checkbox"
          checked={isOpen}
          onChange={handleToggle}
          className="hidden"
        />
        <IntentHeader
          name={name}
          nameInputRef={nameInputRef}
          isOpen={isOpen}
          isEditingName={isEditingName}
          onToggle={handleToggle}
          onNameChange={handleNameChange}
          onNameEditToggle={handleNameEditToggle}
          isFallback={intent.name.toLowerCase() === "fallback"}
          isNameValid={isNameValid}
          hasAttemptedSave={hasAttemptedSave}
        />
        <IntentBody
          isOpen={isOpen}
          isTrainingOpen={isTrainingOpen}
          examples={examples}
          response={response}
          isFallback={intent.name.toLowerCase() === "fallback"}
          onTrainingToggle={handleTrainingToggle}
          onAddExample={handleAddExample}
          onUpdateExample={handleUpdateExample}
          onDeleteExample={handleDeleteExample}
          onResponseChange={handleResponseChange}
          onDelete={handleDelete}
          onSave={handleSave}
          isChanged={isChanged}
          areExamplesValid={areExamplesValid}
          isResponseValid={isResponseValid}
          hasAttemptedSave={hasAttemptedSave}
        />
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        name={name}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      <UnsavedChangesModal
        isOpen={isModalOpen}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </div>
  );
};

IntentItem.propTypes = {
  intent: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    examples: PropTypes.arrayOf(PropTypes.string).isRequired,
    response: PropTypes.string.isRequired,
    isNew: PropTypes.bool,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default IntentItem;
