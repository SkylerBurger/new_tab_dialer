import { useEffect, useState } from "react";

function useTime() {
  const [ready, setReady] = useState(false);
  const [time, setTime] = useState("00:00");

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-GB").slice(0, -3));
      setReady(true);
    }, 1000);
    return () => clearInterval(updateInterval);
  }, []);

  return { ready, time };
}

export default useTime;
