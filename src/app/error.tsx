"use client";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div>
      <button onClick={reset}>Home</button>
    </div>
  );
};

export default error;
