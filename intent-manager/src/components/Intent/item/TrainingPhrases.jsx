import React from "react";
import PropTypes from "prop-types";
import { ChatBubbleOvalLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconSolid,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/solid";

const TrainingPhrases = ({
  examples,
  isDisabled,
  onAddExample,
  onUpdateExample,
  onDeleteExample,
  areExamplesValid,
  hasAttemptedSave,
}) => {
  const handleInputSubmit = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      event.preventDefault();
      onAddExample(event.target.value.trim());
      areExamplesValid = true;
      event.target.value = "";
    }
  };

  return (
    <div className="collapse-content flex flex-col gap-4 border-t-2 border-base-200 p-4">
      <div
        className={` ${hasAttemptedSave && !areExamplesValid ? "tooltip tooltip-open tooltip-error" : ""} text-sm`}
        data-tip="At least one training phrase is required!"
      >
        <label className="input input-bordered flex items-center gap-2">
          <ChatBubbleOvalLeftIcon className="h-6 w-6" />
          <input
            type="text"
            className="grow"
            placeholder="Add user expression"
            disabled={isDisabled}
            onKeyDown={handleInputSubmit}
          />
        </label>
      </div>
      {examples.length > 0 && (
        <div className="divider text-sm text-gray-500">All phrases</div>
      )}
      <div className="examples flex flex-col gap-2">
        {examples.map((example, idx) => (
          <label
            key={idx}
            className="input input-bordered flex items-center gap-2"
          >
            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 opacity-40" />
            <input
              type="text"
              className="grow"
              value={example}
              onChange={(e) => onUpdateExample(idx, e.target.value)}
            />
            <XMarkIcon
              className="h-6 w-6 cursor-pointer opacity-40"
              onClick={() => onDeleteExample(idx)}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

TrainingPhrases.propTypes = {
  examples: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAddExample: PropTypes.func.isRequired,
  onUpdateExample: PropTypes.func.isRequired,
  onDeleteExample: PropTypes.func.isRequired,
};

export default TrainingPhrases;
