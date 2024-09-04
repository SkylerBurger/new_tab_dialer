import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import "./GroupDetails.css";
import { useGroupDetails } from "./useGroupDetails";
import { ArrowSelector } from "../ArrowSelector/ArrowSelector";
import { Confirm } from "../Confirm/Confirm";
import { NewDialForm } from "../NewDialForm/NewDialForm";

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

function DialDetails({ index, first, last, name, icon, link, shiftDial }) {
  return (
    <li className="DialDetails">
      <ArrowSelector
        downAble={!last}
        onDown={() => shiftDial(index, 1)}
        onUp={() => shiftDial(index, -1)}
        upAble={!first}
      />
      <img src={icon} alt={name} />
      <div>
        <p>{name}</p>
        <p>{link}</p>
      </div>
      <DeleteDial index={index} shiftDial={shiftDial} />
    </li>
  );
}

export default function GroupDetails({
  setShowDetails,
  showConfirm,
  setShowConfirm,
  updateGroupDials,
}) {
  const {
    applyChanges,
    confirmOptions,
    isPendingChanges,
    tempDials,
    insertNewDial,
    message,
    name,
    onCancel,
    shiftDial,
    showAddDial,
    setShowAddDial,
  } = useGroupDetails({
    showConfirm,
    setShowConfirm,
    setShowDetails,
    updateGroupDials,
  });

  return (
    <div className="GroupDetails">
      <h1>{name}</h1>
      {showConfirm && <Confirm message={message} options={confirmOptions} />}
      {showAddDial && (
        <NewDialForm
          insertNewDial={insertNewDial}
          setShowAddDial={setShowAddDial}
        />
      )}
      <ul>
        {tempDials.map((dial, index) => (
          <DialDetails
            {...dial}
            index={index}
            first={index === 0}
            last={index === tempDials.length - 1}
            shiftDial={shiftDial}
          />
        ))}
      </ul>
      <button onClick={() => setShowAddDial(true)}>Add Dial</button>
      <button onClick={onCancel}>Cancel</button>
      <button
        onClick={() => applyChanges(name, tempDials)}
        disabled={!isPendingChanges}
      >
        Apply
      </button>
    </div>
  );
}
