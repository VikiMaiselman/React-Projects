import { useReducer, useEffect } from "react";

export default function useLocalStorageReducer(key, initialVal, reducer) {
  const [val, dispatch] = useReducer(reducer, initialVal, () => {
    return JSON.parse(window.localStorage.getItem(key)) || initialVal;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(val));
  }, [val]);

  return [val, dispatch];
}
