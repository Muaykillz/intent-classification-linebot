import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const AlertMessage = ({ type, message }) => {
  if (!message) return null;

  return (
    <div
      role="alert"
      className={`alert fixed right-6 top-6 z-50 min-w-56 max-w-72 rounded-xl ${type === "success" ? "text-green-950" : "text-red-950"} transition-transform duration-300 ${
        type === "success" ? "alert-success" : "alert-error"
      } translate-y-0 transform opacity-100`}
    >
      {type === "success" ? (
        <CheckCircleIcon className="h-6 w-6" />
      ) : (
        <XCircleIcon className="h-6 w-6" />
      )}
      {message}
    </div>
  );
};

export default AlertMessage;
