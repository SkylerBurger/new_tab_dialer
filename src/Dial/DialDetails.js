import "./DialDetails.css";
import ArrowSelector from "../Common/ArrowSelector/ArrowSelector";
import useCachedImage from "../Common/Hooks/useCachedImage";
import DeleteDial from "./DialOperations/DeleteDial/DeleteDial";
import EditDial from "./DialOperations/EditDial/EditDial";
import TransferDial from "./DialOperations/TransferDial/TransferDial";
import useGroupStore from "../Stores/useGroupStore";

function DialDetails({ groupName, index, first, last, name, icon, link }) {
  const shiftDial = useGroupStore.getState().shiftDial;
  const storageDuration = 1000 * 60 * 60 * 24; // 1 day
  const { error, image } = useCachedImage("dial-images", icon, storageDuration);
  const imgTitle = error
    ? `${name} - Error occurred while fetching image`
    : name;
  const style = error ? { filter: "drop-shadow(0 0 3px rgb(255, 50, 0))" } : {};

  return (
    <li className="DialDetails">
      <ArrowSelector
        downAble={!last}
        onDown={() => shiftDial(groupName, index, 1)}
        downTitle="Move Dial Lower in Group"
        onUp={() => shiftDial(groupName, index, -1)}
        upAble={!first}
        upTitle="Move Dial Higher in Group"
      />
      <img src={image} alt={imgTitle} title={imgTitle} style={style} />
      <div>
        <p>{name}</p>
        <p>{link}</p>
      </div>
      <div className="actionsBox">
        <EditDial
          index={index}
          name={name}
          icon={icon}
          link={link}
          groupName={groupName}
        />
        <TransferDial index={index} groupName={groupName} />
        <DeleteDial index={index} groupName={groupName} />
      </div>
    </li>
  );
}

export default DialDetails;
