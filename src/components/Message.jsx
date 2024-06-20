import React from "react";

const Message = ({ title, message }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
        <p className="text-gray-300 text-center">{message}</p>
      </div>
    </div>
  );
};

export default Message;
