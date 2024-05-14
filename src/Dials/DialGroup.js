import "./dialGroup.css";
import Dial from "./Dial";

function DialGroup({ groupDials }) {
  return (
    <div className="DialGroup">
      {groupDials.map((dialData, index) => {
        return <Dial {...dialData} key={index} />;
      })}
    </div>
  );
}

export default DialGroup;
