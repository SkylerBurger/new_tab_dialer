import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import "./GroupDetails.css";
import { useGroupDetails } from "./useGroupDetails";
import { ArrowSelector } from "../ArrowSelector/ArrowSelector";
import { Confirm } from "../Confirm/Confirm";

function DeleteDial({ index, shiftDial }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteDial = () => {
    setConfirmDelete(false);
    shiftDial(index, null);
  };

  return (
    <>
      <FontAwesomeIcon
        className="faTrash"
        icon={faTrash}
        onClick={() => setConfirmDelete(true)}
      />
      {confirmDelete && (
        <Confirm
          message="Delete this dial?"
          options={[
            {
              label: "Cancel",
              action: () => setConfirmDelete(false),
              color: "#4CAF50",
            },
            { label: "Delete", action: deleteDial, color: "#f44336" },
          ]}
        />
      )}
    </>
  );
}

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
      <DeleteDial index={index} shiftDial={shiftDial} />
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
