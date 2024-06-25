import React from "react";
import TrainingPhrases from "./TrainingPhrases";
import Response from "./Response";

const IntentBody = ({
  isOpen,
  isTrainingOpen,
  examples,
  response,
  isFallback,
  onTrainingToggle,
  onAddExample,
  onUpdateExample,
  onDeleteExample,
  onResponseChange,
  onDelete,
  onSave,
  isChanged,
  areExamplesValid,
  isResponseValid,
  hasAttemptedSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="collapse-content flex flex-col gap-4 border-t-2 border-base-200 p-4">
      {/* Training Phrases */}
      <div
        className={`collapse collapse-arrow rounded-lg border-2 border-base-200 ${isTrainingOpen ? "open" : ""}`}
      >
        <input
          type="checkbox"
          checked={isTrainingOpen}
          onChange={onTrainingToggle}
          className="hidden"
        />
        <div
          className="collapse-title cursor-pointer select-none text-lg font-medium"
          onClick={onTrainingToggle}
        >
          Training phrases
        </div>
        {isTrainingOpen && (
          <>
            <TrainingPhrases
              examples={examples}
              isDisabled={isFallback}
              onAddExample={onAddExample}
              onUpdateExample={onUpdateExample}
              onDeleteExample={onDeleteExample}
              areExamplesValid={areExamplesValid}
              hasAttemptedSave={hasAttemptedSave}
            />
          </>
        )}
      </div>

      {/* Response */}
      <div
        className={`${hasAttemptedSave && !isResponseValid ? "border-red-600" : ""}`}
      >
        <Response
          response={response}
          onResponseChange={onResponseChange}
          isResponseValid={isResponseValid}
          hasAttemptedSave={hasAttemptedSave}
        />
      </div>

      {/* Save and Delete Btn */}
      <div className="flex justify-end space-x-2">
        <button
          className="btn btn-error w-24 text-white"
          onClick={onDelete}
          disabled={isFallback}
        >
          Delete
        </button>
        <button
          className={`btn w-24 ${isChanged ? "btn-primary" : "btn-disabled"}`}
          onClick={onSave}
          disabled={!isChanged}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default IntentBody;
