"use client";
import React, { useState } from "react";

const DashWlc = () => {
  const [clcik, setclick] = useState(false);
  const isClicked = () => {
    setclick(true);
  };
  return (
    <div className={`${clcik === true && "hidden"}`}>
      <div className="flex flex-row items-center gap-2 overflow-hidden rounded-lg border border-violet-600 bg-gray-50 py-2 pl-4 shadow">
        <span className="item-center mx-3 inline-flex flex-shrink-0 justify-center rounded-full bg-violet-600 leading-none text-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-8 w-8"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
        <div className="flex-1 p-2">
          <p className="text-sm text-gray-800">
           Welcome to Dashboard
          </p>
        </div>
        <button
          type="button"
          onClick={isClicked}
          className="ml-6 p-2 text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DashWlc;
