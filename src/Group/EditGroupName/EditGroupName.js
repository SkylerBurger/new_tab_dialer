import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

import PopUpModal from "../../Common/PopUpModal/PopUpModal";
import useGroupStore from "../../Stores/useGroupStore";

import "./EditGroupName.css";

function useEditGroupName(groupName) {
  const [renameGroup, getGroupNames] = useGroupStore((state) => {
    return [state.renameGroup, state.getGroupNames];
  });
  const [tempName, setTempName] = useState(groupName ? groupName : "");
  const [showEdit, setShowEdit] = useState(false);
  const [restrictRename, setRestrictRename] = useState(true);

  const handleNameSave = () => {
    const trimmedNewName = tempName.trim();
    setTempName(trimmedNewName);
    renameGroup(groupName, trimmedNewName);
    setShowEdit(false);
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const existingNames = getGroupNames();
    const newName = event.target.value;
    setTempName(newName);
    const createButton = document.getElementById("renameGroupSave");

    if (newName === "") {
      createButton.title = "Name cannot be empty";
      setRestrictRename(true);
    } else if (existingNames.includes(newName.trim())) {
      createButton.title = "Name already exists";
      setRestrictRename(true);
    } else {
      createButton.title = "";
      setRestrictRename(false);
    }
  };

  return {
    tempName,
    showEdit,
    setShowEdit,
    handleNameSave,
    handleInputChange,
    restrictRename,
  };
}

function EditGroupName({ groupName }) {
  const {
    tempName,
    showEdit,
    setShowEdit,
    handleNameSave,
    handleInputChange,
    restrictRename,
  } = useEditGroupName(groupName);
  return (
    <div className="EditGroupName">
      <h2 className="EditGroupNameHeader">{groupName}</h2>
      <FontAwesomeIcon
        icon={faPencil}
        onClick={() => setShowEdit(!showEdit)}
        style={{ alignSelf: "center" }}
      />
      {showEdit && (
        <PopUpModal>
          <h2>Edit Group Name</h2>
          <div>
            <label>Group Name</label>
            <input
              id="groupName"
              type="text"
              value={tempName}
              onChange={handleInputChange}
            />
          </div>
          <div className="buttonBox">
            <button className="red" onClick={() => setShowEdit(false)}>
              Cancel
            </button>
            <button
              className="green"
              id="renameGroupSave"
              onClick={handleNameSave}
              disabled={restrictRename}
            >
              Save
            </button>
          </div>
        </PopUpModal>
      )}
    </div>
  );
}

export default EditGroupName;
