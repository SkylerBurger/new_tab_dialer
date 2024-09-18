import "./GroupDetails.css";
import { useGroupDetails } from "./useGroupDetails";
import Confirm from "../../Common/Confirm/Confirm";
import NewDialForm from "../../Dial/DialOperations/NewDialForm/NewDialForm";
import DialDetails from "../../Dial/DialDetails";

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
