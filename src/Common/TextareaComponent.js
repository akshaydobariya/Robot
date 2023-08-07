import React from "react";

const TextareaComponent = ({
  id,
  name,
  value,
  placeholder,
  onBlur,
  onChange,
  error,
  touch,
}) => {
  const hasError = error && touch;
  return (
    <>
      <textarea
        id={id}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        rows="3"
        className="w-full py-2 px-4 rounded bg-transparent border-white border-2 focus:border-blue-500"
        placeholder={placeholder}
      ></textarea>
      <div className="text-black">
        {hasError && <p className="text-sm text-red-600 ">{error}</p>}
      </div>
    </>
  );
};

export default TextareaComponent;
