// Import necessary dependencies and modules
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRobotData } from "../../State/features/RobotSlice";
import Shimmer from "../Shimmer/shimmer";
import { card } from "../../Gsap/gsap";

const Home = () => {
  // Accessing data from the Redux store
  const { robotData, isLoading } = useSelector((state) => state.robots);
  const dispatch = useDispatch();
  const cardRef = useRef(null);

  // Fetch robot data from the API when the component mounts
  useEffect(() => {
    dispatch(fetchRobotData());
    card(cardRef);
  }, []);

  // Display shimmer effect while data is being fetched
  if (isLoading) {
    return <Shimmer />;
  }

  // Render the list of robots when data is available
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-black min-h-fit">
      {robotData?.map((robot) => (
        <div
          key={robot.Id}
          className="max-w-sm border-x-8 border-gray-200 rounded-3xl dark:bg-white-800 dark:border-gray-700 text-white mt-2 ml-2 mb-2"
          ref={cardRef}
        >
          <a href="#">
            <img
              key={robot.Id}
              className="rounded-t-lg mt-2 p-4 ml-4 w-11/12 h-3/5 sm:h-80 object-fill "
              src={`http://localhost:7584/images/${robot.imagePath}`}
              alt="robot"
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {robot.robotName}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {robot.robotFeatures}
            </p>

            {/* Link to view more details of the robot */}
            <Link
              to={"/view/" + robot.id}
              className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
              style={{ minHeight: "15px" }} // Adjust the minimum height here
            >
              {/* Background span for the hover effect */}
              <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                View More
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
