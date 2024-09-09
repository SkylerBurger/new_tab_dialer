import "./Group.css";
import Dial from "../Dial/Dial";
import useGroup from "./useGroup";

function Group() {
  const { dials, showDials } = useGroup();

  return (
    <div className={`Group ${showDials ? "fade-in" : "fade-out"}`}>
      {dials.map((dialData, index) => {
        return <Dial {...dialData} key={index} />;
      })}
    </div>
  );
}

export default Group;
