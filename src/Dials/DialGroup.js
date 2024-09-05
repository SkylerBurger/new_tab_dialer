import "./dialGroup.css";
import Dial from "./Dial";
import useDialGroup from "./useDialGroup";

function DialGroup() {
  const { dials, handleImgLoad, showDials } = useDialGroup();

  return (
    <div className={`DialGroup ${showDials ? "fade-in" : "fade-out"}`}>
      {dials.map((dialData, index) => {
        return <Dial {...dialData} key={index} onImgLoad={handleImgLoad} />;
      })}
    </div>
  );
}

export default DialGroup;
