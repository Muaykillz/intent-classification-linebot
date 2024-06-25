import React from "react";
import { PencilIcon, LockClosedIcon } from "@heroicons/react/24/solid";

const IntentHeader = ({
  name,
  nameInputRef,
  isOpen,
  isEditingName,
  onToggle,
  onNameChange,
  onNameEditToggle,
  isFallback,
  isNameValid,
  hasAttemptedSave,
}) => {
  return (
    <div
      className="collapse-title flex cursor-pointer select-none items-center text-xl font-medium"
      onClick={onToggle}
    >
      {isEditingName ? (
        <input
          type="text"
          value={name}
          ref={nameInputRef}
          onChange={onNameChange}
          className={`rounded-sm border-gray-300 ${!isNameValid && hasAttemptedSave ? "rounded-md border border-red-500" : ""} focus:border-b focus:border-dashed focus:outline-none`}
          placeholder="Intent name"
        />
      ) : (
        <div className="group flex items-center space-x-2">
          <span>{name}</span>
          {isOpen &&
            (isFallback ? (
              <LockClosedIcon className="h-4 w-4 text-gray-400" />
            ) : (
              <PencilIcon
                className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onNameEditToggle();
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default IntentHeader;
