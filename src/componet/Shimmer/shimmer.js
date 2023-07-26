import React from "react";

// Shimmer effect for a single card
const ShimmerCard = () => {
  return (
    // Use Fragment to avoid unnecessary divs in the DOM
    <>
      <div className="w-1/3 p-4">
        <div className="border rounded-xl border-gray-300 rounded p-4 mb-4 animate-pulse h-[350px]">
          {/* Placeholder for card image */}
          <div className="bg-gray-300 h-56 mb-4 rounded w-100"></div>
          {/* Placeholder for card title */}
          <div className="bg-gray-300 h-4 w-5/6 mb-2 rounded"></div>
          {/* Placeholder for card content */}
          <div className="bg-gray-300 h-4 w-4/6 rounded"></div>
          {/* Placeholder for additional content */}
          <div className="bg-gray-300 h-4 w-3/6 mt-2 rounded"></div>
        </div>
      </div>
    </>
  );
};

const Shimmer = () => {
  // Create an array of placeholders for shimmer cards
  const shimmerCards = Array.from({ length: 6 });

  return (
    <div className="bg-black">
      <div className="container mx-auto py-10">
        <div className="flex flex-wrap">
          {/* Map through the array and render shimmer cards */}
          {shimmerCards.map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
