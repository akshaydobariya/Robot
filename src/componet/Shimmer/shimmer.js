import React from "react";

const ShimmerCard = () => {
  return (
    <div className="w-1/3 p-4">
      <div className="border rounded-xl border-gray-300 rounded p-4 mb-4 animate-pulse h-[350px]">
        <div className="bg-gray-300 h-56 mb-4 rounded w-100"></div>
        <div className="bg-gray-300 h-4 w-5/6 mb-2 rounded"></div>
        <div className="bg-gray-300 h-4 w-4/6 rounded"></div>
        <div className="bg-gray-300 h-4 w-3/6 mt-2 rounded"></div>
      </div>
    </div>
  );
};

const Shimmer = () => {
  const shimmerCards = Array.from({ length: 6});

  return (
    <div className=" bg-black">
      <div className="container mx-auto py-10">
        <div className="flex flex-wrap">
          {shimmerCards.map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
