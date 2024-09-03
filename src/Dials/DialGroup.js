import "./dialGroup.css";
import Dial from "./Dial";
import useDialGroup from "./useDialGroup";

function DialGroup({ dials, dialsVisibility, setDialsVisibility }) {
  const { handleImgLoad } = useDialGroup({ dials, setDialsVisibility });

  return (
    <div className={`DialGroup ${dialsVisibility ? "fade-in" : "fade-out"}`}>
      {dials.map((dialData, index) => {
        return <Dial {...dialData} key={index} onImgLoad={handleImgLoad} />;
      })}
    </div>
  );
}

export default DialGroup;
