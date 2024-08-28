import "./GroupDetails.css";
import { useGroupDetails } from "./useGroupDetails";
import { ArrowSelector } from "../ArrowSelector/ArrowSelector";
import { Confirm } from "../Confirm/Confirm";

function DialDetails({ index, first, last, name, image, url, shiftDial }) {
  return (
    <li className="DialDetails">
      <ArrowSelector
        downAble={!last}
        onDown={() => shiftDial(index, 1)}
        onUp={() => shiftDial(index, -1)}
        upAble={!first}
      />
      <img src={image} alt={name} />
      <div>
        <p>{name}</p>
        <p>{url}</p>
      </div>
    </li>
  );
}

export default function GroupDetails({
  groupDials,
  groupName,
  isPendingChanges,
  setIsPendingChanges,
  setShowDetails,
  showConfirm,
  setShowConfirm,
  setShowSettings,
  updateGroupDials,
  updateGroupIndex,
}) {
  const { applyChanges, confirmOptions, dials, message, onCancel, shiftDial } =
    useGroupDetails({
      groupDials,
      setIsPendingChanges,
      showConfirm,
      setShowConfirm,
      setShowDetails,
      setShowSettings,
      updateGroupDials,
      updateGroupIndex,
    });

  return (
    <div className="GroupDetails">
      <h1>{groupName}</h1>
      {showConfirm && <Confirm message={message} options={confirmOptions} />}
      <ul>
        {dials.map((dial, index) => (
          <DialDetails
            {...dial}
            index={index}
            first={index === 0}
            last={index === dials.length - 1}
            shiftDial={shiftDial}
          />
        ))}
      </ul>
      <button>Add Dial</button>
      <button onClick={onCancel}>Cancel</button>
      <button
        onClick={() => applyChanges(groupName, dials)}
        disabled={!isPendingChanges}
      >
        Apply
      </button>
    </div>
  );
}
