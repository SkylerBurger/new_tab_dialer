import "./GroupDetails.css";
import { useGroupDetails } from "./useGroupDetails";
import ArrowSelector from "../Common/ArrowSelector/ArrowSelector";
import Confirm from "../Common/Confirm/Confirm";
import DeleteDial from "../DialOperations/DeleteDial/DeleteDial";
import NewDialForm from "../DialOperations/NewDialForm/NewDialForm";
import TransferDial from "../DialOperations/TransferDial/TransferDial";

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
      <div className="actionsBox">
        <TransferDial index={index} shiftDial={shiftDial} />
        <DeleteDial index={index} shiftDial={shiftDial} />
      </div>
    </li>
  );
}

function GroupDetails() {
  const {
    applyChanges,
    confirmDeleteOptions,
    confirmUnsavedNavOptions,
    groupCount,
    isPendingChanges,
    tempDials,
    insertNewDial,
    name,
    onCancel,
    shiftDial,
    showAddDial,
    showConfirmDelete,
    setShowAddDial,
    setShowConfirmDelete,
    tempName,
    handleNameInput,
    showConfirmUnsavedNav,
  } = useGroupDetails();

  return (
    <div className="GroupDetails">
      <div className="GroupName">
        <h1>Group Name:</h1>
        <input type="text" value={tempName} onChange={handleNameInput} />
      </div>
      {showConfirmUnsavedNav && <Confirm {...confirmUnsavedNavOptions} />}
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
      <div className="buttonBox">
        <button
          style={{ backgroundColor: "#00ffff" }}
          onClick={() => setShowAddDial(true)}
        >
          Add New Dial
        </button>
        <div>
          <button style={{ backgroundColor: "#f44336" }} onClick={onCancel}>
            Cancel
          </button>
          <button
            className="applyChanges"
            onClick={() => applyChanges(name, tempDials)}
            disabled={!isPendingChanges}
          >
            Apply Changes
          </button>
        </div>
      </div>
      {groupCount > 1 && (
        // Don't allow deletion if this is the only group
        <div className="DangerousOperations">
          <h2>Dangerous Operations</h2>
          <button onClick={() => setShowConfirmDelete(true)}>
            Delete Group
          </button>
        </div>
      )}
      {showConfirmDelete && <Confirm {...confirmDeleteOptions} />}
    </div>
  );
}

export default GroupDetails;
