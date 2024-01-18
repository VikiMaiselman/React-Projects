import React, { useState } from "react";

export default function useToggle(initialVal) {
  const [val, setVal] = useState(initialVal);

  const handleChange = () => {
    setVal(!val);
  };

  return [val, handleChange];
}
