import React, { useState } from "react";

export default function useInputState(initValue = "") {
  const [val, setVal] = useState(initValue);

  const handleChange = (event) => {
    const { value } = event.target;
    setVal(value);
  };

  const reset = () => {
    setVal("");
  };

  return [val, handleChange, reset];
}
