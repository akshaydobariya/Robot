import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  // Create an array of products (in this case, the same product is repeated 6 times)
  const products = Array.from({ length: 6 }, (_, index) => index);

  return (
    <div className="grid grid-cols-3 gap-4 bg-black min-h-fit">
      {products.map((product, index) => (
        <div
          key={index}
          className="
          max-w-sm  border-x-8 border-gray-200 rounded-3xl  dark:bg-white-800 dark:border-gray-700 text-white mt-2 ml-2 mb-2"
        >
          <a href="#">
            <img
              className="rounded-t-lg mt-2 p-4 "
              src="https://cdn.dribbble.com/userupload/5604280/file/original-2c47df1b9de0c5e3c67e38c0f2b43b76.jpg?crop=0x0-1080x810"
              alt="robot"
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                RoBoTics 2023
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <Link
              to="/view"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
