import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
      <div className="border-t-4 border-blue-500 border-solid rounded-full h-16 w-16 animate-spin"></div>
    </div>
  );
};

export default Loader;
