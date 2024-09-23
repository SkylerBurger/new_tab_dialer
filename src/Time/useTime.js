import { useEffect, useState } from "react";

function useTime(timeFormat) {
  const [ready, setReady] = useState(false);
  const [time, setTime] = useState("00:00");

  useEffect(() => {
    const updateInterval = setInterval(() => {
      let timeString = "";
      if (timeFormat !== "24") {
        let rawTimeString = new Date().toLocaleTimeString("en-US");
        timeString = `${rawTimeString.slice(0, -6)} ${rawTimeString.slice(-2)}`;
      } else {
        timeString = new Date().toLocaleTimeString("en-GB").slice(0, -3);
      }
      setTime(timeString);
      setReady(true);
    }, 1000);
    return () => clearInterval(updateInterval);
  }, [timeFormat]);

  return { ready, time };
}

export default useTime;
