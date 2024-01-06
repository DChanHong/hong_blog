import React from "react";
import { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center border-2">
      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="text-gray-600 text-lg mb-8">
        We apologize for the inconvenience. Please try again later.
      </p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={resetErrorBoundary}
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorFallback;
