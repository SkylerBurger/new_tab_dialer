import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Confirm from "../../../Common/Confirm/Confirm";
import PopUpModal from "../../../Common/PopUpModal/PopUpModal";
import useTransferDial from "./useTransferDial";

function TransferDial({ index, groupName }) {
  const {
    confirmTransfer,
    setConfirmTransfer,
    showTransfer,
    setShowTransfer,
    groupNames,
    currentGroup,
    handleTransfer,
  } = useTransferDial(index, groupName);

  return (
    <div className="TransferDial dialOperation" title="Transfer Dial">
      <FontAwesomeIcon
        className="transfer"
        icon={faArrowRightArrowLeft}
        onClick={() => setShowTransfer(true)}
      />
      {showTransfer && (
        <PopUpModal>
          <h2>{`Transfer ${currentGroup.dials[index].name} Dial to:`}</h2>
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
            <button className="red" onClick={() => setShowTransfer(false)}>
              Cancel
            </button>
            <button className="green" onClick={() => setConfirmTransfer(true)}>
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

export default TransferDial;
