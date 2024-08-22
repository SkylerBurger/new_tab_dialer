import "./dialGroup.css";
import Dial from "./Dial";
import useDialGroup from "./useDialGroup";

function DialGroup({ groupDials, dialsVisibility, setDialsVisibility }) {
  const { handleImgLoad } = useDialGroup(groupDials, setDialsVisibility);

  return (
    <div className={`DialGroup ${dialsVisibility ? "fade-in" : "fade-out"}`}>
      {groupDials.map((dialData, index) => {
        return <Dial {...dialData} key={index} onImgLoad={handleImgLoad} />;
      })}
    </div>
  );
}

export default DialGroup;
