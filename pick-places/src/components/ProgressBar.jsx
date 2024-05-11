import { useEffect, useState } from "react";

export default function ProgressBar({}) {
  const [remainingTime, setRemTime] = useState(3000);
  useEffect(() => {
    const int = setInterval(() => {
      setRemTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(int);
    };
  }, []);

  return <progress value={remainingTime} max={3000} />;
}
