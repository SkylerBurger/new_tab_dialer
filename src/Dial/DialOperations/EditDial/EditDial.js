import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import useGroupStore from "../../../Stores/useGroupStore";
import PopUpModal from "../../../Common/PopUpModal/PopUpModal";

function useEditDial(groupName, index, name, icon, link) {
  const [tempName, setTempName] = useState(name);
  const [tempIcon, setTempIcon] = useState(icon);
  const [tempLink, setTempLink] = useState(link);
  const [isModified, setIsModified] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [updateGroup] = useGroupStore((state) => [state.updateGroup]);

  useEffect(() => {
    setTempName(name);
    setTempIcon(icon);
    setTempLink(link);
  }, [name, icon, link]);

  useEffect(() => {
    const foundChange =
      tempName !== name || tempIcon !== icon || tempLink !== link;
    setIsModified(foundChange);
  }, [tempName, tempIcon, tempLink, name, icon, link]);

  const handleInputChange = (id) => {
    const value = document.getElementById(id).value;
    switch (id) {
      case "dialTitle":
        setTempName(value);
        break;
      case "iconUrl":
        setTempIcon(value);
        break;
      case "linkUrl":
        setTempLink(value);
        break;
      default:
        break;
    }
  };

  const saveChanges = () => {
    const groupDials = [...useGroupStore.getState().getCurrentGroup().dials];
    const newDial = { name: tempName, icon: tempIcon, link: tempLink };
    groupDials[index] = newDial;
    updateGroup(groupName, groupDials);
    setShowEdit(false);
  };

  return {
    isModified,
    showEdit,
    setShowEdit,
    tempName,
    tempIcon,
    tempLink,
    handleInputChange,
    saveChanges,
  };
}

function EditDial({ groupName, index, name, icon, link }) {
  const {
    isModified,
    showEdit,
    setShowEdit,
    tempName,
    tempIcon,
    tempLink,
    handleInputChange,
    saveChanges,
  } = useEditDial(groupName, index, name, icon, link);

  const handleShowEdit = () => {
    setShowEdit(true);
  };

  return (
    <>
      <div className="EditDial dialOperation" title="Edit Dial">
        <FontAwesomeIcon icon={faPencil} onClick={handleShowEdit} />
      </div>
      {showEdit && (
        <PopUpModal>
          <div className="EditDialForm">
            <h2>Edit Dial</h2>
            <div>
              <label>Dial Name</label>
              <input
                id="dialTitle" // Can't use "dialName" because of 3rd Party Extensions
                type="text"
                placeholder="Dial Name"
                value={tempName}
                onChange={() => handleInputChange("dialTitle")}
              />
            </div>
            <div>
              <label>Icon URL</label>
              <input
                id="iconUrl"
                type="text"
                placeholder="Icon"
                value={tempIcon}
                onChange={() => handleInputChange("iconUrl")}
              />
            </div>
            <div>
              <label>Link URL</label>
              <input
                id="linkUrl"
                type="text"
                placeholder="Link"
                value={tempLink}
                onChange={() => handleInputChange("linkUrl")}
              />
            </div>
            <div className="buttonBox">
              <button className="red" onClick={() => setShowEdit(false)}>
                Cancel
              </button>
              <button
                className="green"
                disabled={!isModified}
                onClick={saveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </PopUpModal>
      )}
    </>
  );
}

export default EditDial;
