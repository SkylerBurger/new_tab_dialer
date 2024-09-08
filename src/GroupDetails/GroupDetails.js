import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import "./GroupDetails.css";
import { useGroupDetails } from "./useGroupDetails";
import { ArrowSelector } from "../ArrowSelector/ArrowSelector";
import { Confirm } from "../Confirm/Confirm";
import { NewDialForm } from "../NewDialForm/NewDialForm";
import PopUpModal from "../PopUpModal/PopUpModal";
import useGroupStore from "../Stores/useGroupStore";
import useSettingStore from "../Stores/useSettingStore";

function TransferDial({ index, shiftDial, setShowConfirm }) {
  const [confirmTransfer, setConfirmTransfer] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [currentGroupIndex] = useSettingStore((state) => [
    state.currentGroupIndex,
  ]);
  const [groups, transferDial] = useGroupStore((state) => [
    state.groups,
    state.transferDial,
  ]);
  const groupNames = groups.map((group) => group.name);
  const currentGroup = groups[currentGroupIndex];

  const handleTransfer = () => {
    const toGroup = document.getElementById("toGroup").value;
    // UI Flags
    setConfirmTransfer(false);
    setShowConfirm(false);
    setShowTransfer(false);
    // Remove dial from temp and real array of dials
    shiftDial(index, null);
    transferDial(currentGroup.name, currentGroup.dials[index], toGroup);
  };

  return (
    <div className="TransferDial">
      <FontAwesomeIcon
        className="transfer"
        icon={faArrowRightArrowLeft}
        onClick={() => setShowTransfer(true)}
      />
      {showTransfer && (
        <PopUpModal>
          <h1>{`Transfer ${currentGroup.dials[index].name} Dial to:`}</h1>
          <select id="toGroup">
            {groupNames.map(
              (name) =>
                name !== currentGroup.name && (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ),
            )}
          </select>
          <div className="buttonBox">
            <button className="cancel" onClick={() => setShowTransfer(false)}>
              Cancel
            </button>
            <button
              className="proceed"
              onClick={() => setConfirmTransfer(true)}
            >
              Transfer
            </button>
          </div>
        </PopUpModal>
      )}
      {confirmTransfer && (
        <Confirm
          message={`This action is immediately applied. Continue with transferring this dial to the ${document.getElementById("toGroup").value} group?`}
          options={[
            {
              label: "Cancel",
              action: () => setConfirmTransfer(false),
              color: "#f44336",
            },
            { label: "Transfer", action: handleTransfer, color: "#4CAF50" },
          ]}
        />
      )}
    </div>
  );
}

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

function DialDetails({
  index,
  first,
  last,
  name,
  icon,
  link,
  shiftDial,
  setShowConfirm,
}) {
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
      <div className="actionsBox">
        <TransferDial
          index={index}
          shiftDial={shiftDial}
          setShowConfirm={setShowConfirm}
        />
        <DeleteDial index={index} shiftDial={shiftDial} />
      </div>
    </li>
  );
}

export default function GroupDetails({
  setShowDetails,
  showConfirm,
  setShowConfirm,
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
            setShowConfirm={setShowConfirm}
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
