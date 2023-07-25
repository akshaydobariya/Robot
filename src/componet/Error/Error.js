import React from "react"
import { Link } from "react-router-dom";

const Error = () =>{
    return(
        <>
         <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-4xl font-bold text-white mb-4">This page is not available</h1>
      <Link to="/" className="px-4 py-2 bg-blue-700 font-bold text-white rounded hover:bg-blue-600">
        Home
      </Link>
    </div>
        </>
    );
}

export default Error;