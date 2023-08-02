import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Login from "../login/Login";
import {
  deleteRobotApi,
  setSelectedBlog,
} from "../../State/features/RobotSlice";
import Swal from "sweetalert2";
import { card } from "../../Gsap/gsap";

const View = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cardRef = useRef(null);

  const { Roboid } = useParams();
  const [robotData, setRobotData] = useState(null); // Initialize with null
  const { accessToken } = useSelector((state) => state.login);
  const { robotData: allRobotData } = useSelector((state) => state.robots);

  // Function to display success alert when deleting a product
  const displaySuccessAlert = () => {
    // Display a confirmation modal using Swal
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#000",
      color: "#FFFFFF",
    }).then((result) => {
      if (result.isConfirmed) {
        let id = Roboid;
        // Dispatch the deleteRobotApi action to delete the product
        dispatch(deleteRobotApi({ id, accessToken }));
        // Show a success message using Swal
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          background: "#000",
          color: "#fff",
        });
        navigate("/");
      }
    });
  };
  useEffect(() => {
    card(cardRef);
  });

  useEffect(() => {
    // Find the robot data by ID from allRobotData and set it to robotData
    setRobotData(allRobotData.find((r) => r.id == Roboid));
  }, [Roboid, allRobotData]); // Add Roboid and allRobotData to the dependency array

  // Function to handle product edit
  const editHandler = () => {
    dispatch(setSelectedBlog(robotData));
    navigate("/addRobot");
  };

  return accessToken == null ? (
    <Login />
  ) : (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        {robotData ? (
          // If robotData is available, display the view
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <img
                src={`http://localhost:7584/images/${robotData.imagePath}`}
                className="w-9/12 h-96 border-1 rounded-2xl "
                ref={cardRef}
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h1 className="text-3xl font-bold mb-4">{robotData.robotName}</h1>
              <p className="text-lg mb-2">Location: {robotData.location}</p>
              <p className="text-lg mb-2">
                Product Version: {robotData.firmwareVersion}
              </p>
              <p className="text-lg mb-2">
                Product Owner: {robotData.ownerName}
              </p>
              <p className="text-lg mb-2">
                Product Details: {robotData.robotFeatures}
              </p>
              <div className="flex-1">
                <button
                  className="mt-4 ml-15 mr-6 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded"
                  onClick={() => editHandler()}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-400 text-white py-2 px-4 rounded"
                  onClick={() => displaySuccessAlert()}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          // If robotData is not found, display a message or fallback UI
          <p>Robot data not found.</p>
        )}
      </div>
    </div>
  );
};

export default View;
