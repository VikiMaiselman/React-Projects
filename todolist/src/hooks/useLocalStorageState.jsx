import { useState, useEffect } from "react";

export default function useLocalStorageState(key, initialVal) {
  JSON.parse(window.localStorage.getItem("todos"));

  const [val, setVal] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) || initialVal;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(val));
  }, [val]);

  return [val, setVal];
}
