import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import Confirm from "../../../Common/Confirm/Confirm";
import useGroupStore from "../../../Stores/useGroupStore";

function DeleteDial({ index, groupName }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const shiftDial = useGroupStore.getState().shiftDial;

  const deleteDial = () => {
    setConfirmDelete(false);
    shiftDial(groupName, index);
  };

  return (
    <div className="DeleteDial dialOperation" title="Delete Dial">
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
    </div>
  );
}

export default DeleteDial;
