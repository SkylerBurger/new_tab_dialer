import "./Group.css";
import Dial from "../Dial/Dial";
import useGroup from "./useGroup";

function Group() {
  const { dials, showDials } = useGroup();

  return (
    <div className={`Group ${showDials ? "fade-in" : "fade-out"}`}>
      {dials &&
        dials.map((dialData, index) => {
          return <Dial {...dialData} key={index} />;
        })}
      {dials.length === 0 && (
        <div className="emptyGroupNotice">
          Edit the group above to add a dial.
        </div>
      )}
    </div>
  );
}

export default Group;
