import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Confirm from "../../Common/Confirm/Confirm";
import PopUpModal from "../../Common/PopUpModal/PopUpModal";
import useTransferDial from "./useTransferDial";

function TransferDial({ index, shiftDial }) {
  const {
    confirmTransfer,
    setConfirmTransfer,
    showTransfer,
    setShowTransfer,
    groupNames,
    currentGroup,
    handleTransfer,
  } = useTransferDial(index, shiftDial);

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

export default TransferDial;
