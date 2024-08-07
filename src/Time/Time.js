import "./time.css";
import useTime from "./useTime";

function Time() {
  const { ready, time } = useTime();

  return (
    <div className={`time ${ready ? "ready" : ""}`}>
      <p>{time}</p>
    </div>
  );
}

export default Time;
