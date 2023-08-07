import React from "react";

const InputComponrnt = ({
  type,
  id,
  name,
  value,
  placeholder,
  onBlur,
  onChange,
  className,
  error,
  touch,
}) => {
  const hasError = error && touch;
  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        className={
          className === undefined
            ? "w-full py-2 px-4 rounded bg-transparent border-white border-2 focus:border-blue-500"
            : "peer block min-h-[auto] w-full rounded border-0 bg-white-100/50 text-black px-3 py-[0.32rem] leading-[2.15] outline-none"
        }
        placeholder={placeholder}
      />
      <div className="text-black">
        {hasError && <p className="text-sm text-red-600 ">{error}</p>}
      </div>
    </>
  );
};

export default InputComponrnt;
