import "./GroupDetails.css";
import { useGroupDetails } from "./useGroupDetails";
import Confirm from "../../Common/Confirm/Confirm";
import NewDialForm from "../../Dial/DialOperations/NewDialForm/NewDialForm";
import DialDetails from "../../Dial/DialDetails";

function GroupDetails() {
  const {
    dials,
    confirmDeleteOptions,
    groupCount,
    insertNewDial,
    name,
    showAddDial,
    showConfirmDelete,
    setShowAddDial,
    setShowConfirmDelete,
    tempName,
    handleNameInput,
  } = useGroupDetails();

  return (
    <div className="GroupDetails">
      <div className="GroupName">
        <h1>Group Name:</h1>
        <input type="text" value={tempName} onChange={handleNameInput} />
      </div>
      {showAddDial && (
        <NewDialForm
          insertNewDial={insertNewDial}
          setShowAddDial={setShowAddDial}
        />
      )}
      <ul>
        {dials.map((dial, index) => (
          <DialDetails
            {...dial}
            groupName={name}
            index={index}
            first={index === 0}
            last={index === dials.length - 1}
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
