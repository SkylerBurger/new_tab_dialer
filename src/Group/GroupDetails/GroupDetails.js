import "./GroupDetails.css";
import { useGroupDetails } from "./useGroupDetails";
import Confirm from "../../Common/Confirm/Confirm";
import NewDialForm from "../../Dial/DialOperations/NewDialForm/NewDialForm";
import DialDetails from "../../Dial/DialDetails";
import EditGroupName from "../EditGroupName/EditGroupName";

function GroupDetails() {
  const {
    dials,
    confirmDeleteOptions,
    groupCount,
    insertNewDial,
    groupName,
    showAddDial,
    showConfirmDelete,
    setShowAddDial,
    setShowConfirmDelete,
  } = useGroupDetails();

  return (
    <div className="GroupDetails">
      <EditGroupName groupName={groupName} />
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
            groupName={groupName}
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
