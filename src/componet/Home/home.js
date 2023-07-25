import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRobotData } from "../../State/features/RobotSlice";
import Shimmer from "../Shimmer/shimmer";

const Home = () => {
  const { robotData, isLoading } = useSelector((state) => state.robots);
  const { accessToken } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRobotData());
  }, []);

  return isLoading ? (
    <Shimmer />
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-black min-h-fit">
      {robotData?.map((robot) => (
        <div
          key={robot.Id}
          className="max-w-sm border-x-8 border-gray-200 rounded-3xl dark:bg-white-800 dark:border-gray-700 text-white mt-2 ml-2 mb-2"
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
            <Link
              to={accessToken ? "/view/" + robot.id : "/login"}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg "
              //   accessToken ? "hover:bg-blue-800" : "opacity-100 cursor-not-allowed"
              // } focus:ring-4 focus:outline-none ${
              //   accessToken ? "focus:ring-blue-300" : "focus:ring-transparent"
              // } dark:bg-blue-600 ${
              //   accessToken ? "dark:hover:bg-blue-700" : "dark:hover:bg-transparent"
              // } ${
              //   accessToken ? "dark:focus:ring-blue-800" : "dark:focus:ring-transparent"
              // }`}
            >
              Read more
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
