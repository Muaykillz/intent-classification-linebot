import React from "react";
import PropTypes from "prop-types";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

const Response = ({
  response,
  onResponseChange,
  isResponseValid,
  hasAttemptedSave,
}) => (
  <div className="flex flex-col gap-2 rounded-lg border-2 border-base-200 bg-base-100 p-4">
    <h2 className="mb-2 font-semibold">Response</h2>
    <div
      className={`${hasAttemptedSave && !isResponseValid ? "tooltip tooltip-open tooltip-error" : ""} text-sm`}
      data-tip="Response is required!"
    >
      <label className="input input-bordered flex items-center gap-2">
        <ArrowUturnLeftIcon className="h-6 w-6" />
        <input
          type="text"
          className="grow"
          placeholder="Add a response"
          value={response}
          onChange={onResponseChange}
        />
      </label>
    </div>
  </div>
);

Response.propTypes = {
  response: PropTypes.string.isRequired,
  onResponseChange: PropTypes.func.isRequired,
};

export default Response;
