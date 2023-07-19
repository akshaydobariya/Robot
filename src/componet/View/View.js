import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRobotById } from "../../State/features/RobotSlice";

const View = () => {
  const { Roboid } = useParams();
  const [robotDatas, setRobotData] = useState();
  const { robotData } = useSelector((state) => state.robots);
  console.log(robotData);
  useEffect(() => {
    setRobotData(robotData.find((r) => r.id == Roboid));
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <img
              src={`http://localhost:7584/images/${robotDatas?.imagePath}`}
              className="w-11/12 h-10/11 border-1 rounded-2xl"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h1 className="text-3xl font-bold mb-4">{robotDatas?.robotName}</h1>
            <p className="text-lg mb-2">Location: {robotDatas?.location}</p>
            <p className="text-lg mb-2">
              Product Version: {robotDatas?.firmwareVersion}
            </p>
            <p className="text-lg mb-2">
              Product Owner: {robotDatas?.ownerName}
            </p>
            <p className="text-lg mb-2">
              Product Details:{robotDatas?.robotFeatures}
            </p>
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
