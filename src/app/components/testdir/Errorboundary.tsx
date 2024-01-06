import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
  resetApiFunction: () => void;
}

const ErrorBoundary: React.FC<Props> = ({ children, resetApiFunction }) => {
  const [hasError, setHasError] = useState(false);

  const handleReset = () => {
    resetApiFunction();
    setHasError(false); // Reset the hasError state after calling resetApiFunction
  };

  if (hasError) {
    return (
      <div>
        <button onClick={handleReset}>reset</button>Something went wrong.
      </div>
    );
  }

  try {
    return <>{children}</>;
  } catch (error) {
    console.error("ErrorBoundary caught an error: ", error);
    setHasError(true);
    return (
      <div>
        <button onClick={handleReset}>reset</button>Something went wrong.
      </div>
    );
  }
};

export default ErrorBoundary;
