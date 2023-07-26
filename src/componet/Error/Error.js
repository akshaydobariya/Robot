import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">This page is not available</h1>
      <Link to="/" className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600">
        Home
      </Link>
    </div>

    </>
  );
};

export default Error;
