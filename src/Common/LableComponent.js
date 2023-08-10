import React from "react";

const LableComponent = ({ name }) => {
  return (
    <label htmlFor="ownerName" className="block mb-2 text-base font-bold">
      {name}
    </label>
  );
};

export default LableComponent;
