import "./time.css";
import useTime from "./useTime";

function Time({ timeFormat }) {
  const { ready, time } = useTime(timeFormat);

  return (
    <div className={`time ${ready ? "ready" : ""}`}>
      <p>{time}</p>
    </div>
  );
}

export default Time;
