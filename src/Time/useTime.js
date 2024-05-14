import { useEffect, useState } from "react";

function useTime() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-GB").slice(0, -3));
    }, 1000);
    return () => clearInterval(updateInterval);
  }, []);

  return { time };
}

export default useTime;
