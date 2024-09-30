import "./Group.css";
import Dial from "../Dial/Dial";
import useGroup from "./useGroup";

function Group() {
  const { dials, showDials, incrementLoadCount } = useGroup();

  return (
    <div
      id="dialGroup"
      className={`Group ${showDials ? "fade-in" : "fade-out"}`}
    >
      {dials &&
        dials.map((dialData, index) => {
          return (
            <Dial
              {...dialData}
              key={index}
              incrementLoadCount={incrementLoadCount}
            />
          );
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
