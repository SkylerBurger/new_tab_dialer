import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import Confirm from "../../../Common/Confirm/Confirm";

function DeleteDial({ index, shiftDial }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteDial = () => {
    setConfirmDelete(false);
    shiftDial(index, null);
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
