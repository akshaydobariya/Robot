import React from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const { resId } = useParams();
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <img
              src="https://cdn.dribbble.com/userupload/5604280/file/original-2c47df1b9de0c5e3c67e38c0f2b43b76.jpg?crop=0x0-1080x810"
              className="w-11/12 h-10/11 border-1 rounded-2xl"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h1 className="text-3xl font-bold mb-4">RoboTIcs 2023</h1>
            <p className="text-lg mb-2">Product Details</p>
            <p className="text-lg mb-2">Price: $99.99</p>
            <p className="text-lg mb-2">Location: San Francisco</p>
            <p className="text-lg mb-2">Product Version: 2.0</p>
            <p className="text-lg mb-2">Product Owner: John Doe</p>
            <div className="flex-1">
              <button className="mt-4 ml-15 mr-6 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded">
                Edit
              </button>
              <button className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
