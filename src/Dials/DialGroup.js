import "./dialGroup.css";
import Dial from "./Dial";
import useDialGroup from "./useDialGroup";

function DialGroup({ groupDials, dialVisibility, setDialVisibility }) {
  const { handleImgLoad } = useDialGroup(groupDials, setDialVisibility);

  return (
    <div className={`DialGroup ${dialVisibility ? "fade-in" : "fade-out"}`}>
      {groupDials.map((dialData, index) => {
        return <Dial {...dialData} key={index} onImgLoad={handleImgLoad} />;
      })}
    </div>
  );
}

export default DialGroup;
