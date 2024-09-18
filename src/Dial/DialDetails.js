import "./DialDetails.css";
import ArrowSelector from "../Common/ArrowSelector/ArrowSelector";
import DeleteDial from "./DialOperations/DeleteDial/DeleteDial";
import EditDial from "./DialOperations/EditDial/EditDial";
import TransferDial from "./DialOperations/TransferDial/TransferDial";


function DialDetails({ index, first, last, name, icon, link, shiftDial }) {
  return (
    <li className="DialDetails">
      <ArrowSelector
        downAble={!last}
        onDown={() => shiftDial(index, 1)}
        downTitle="Move Dial Lower in Group"
        onUp={() => shiftDial(index, -1)}
        upAble={!first}
        upTitle="Move Dial Higher in Group"
      />
      <img src={icon} alt={name} />
      <div>
        <p>{name}</p>
        <p>{link}</p>
      </div>
      <div className="actionsBox">
        <EditDial />
        <TransferDial index={index} shiftDial={shiftDial} />
        <DeleteDial index={index} shiftDial={shiftDial} />
      </div>
    </li>
  );
}

export default DialDetails;
