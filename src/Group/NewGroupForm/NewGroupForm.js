import { useState } from "react";

import useRenderStore from "../../Stores/useRenderStore";
import useGroupStore from "../../Stores/useGroupStore";
import useSettingStore from "../../Stores/useSettingStore";
import PopUpModal from "../../Common/PopUpModal/PopUpModal";

function NewGroupForm() {
  const [setShowNewGroupForm, setShowDialDetails] = useRenderStore((state) => [
    state.setShowNewGroupForm,
    state.setShowDialDetails,
  ]);
  const updateGroupIndex = useSettingStore((state) => state.updateGroupIndex);
  const [createGroup, getGroupsLength, getGroupNames] = useGroupStore(
    (state) => {
      return [state.createGroup, state.getGroupsLength, state.getGroupNames];
    },
  );
  const [restrictCreation, setRestrictCreation] = useState(true);
  let tooltip = "Name cannot be empty";

  const handleChange = (event) => {
    event.preventDefault();
    const newName = document.getElementById("name").value;
    const createButton = document.getElementById("create-button");
    const names = getGroupNames();
    if (newName === "") {
      createButton.title = "Name cannot be empty";
      setRestrictCreation(true);
    } else if (names.includes(newName)) {
      createButton.title = "Name already exists";
      setRestrictCreation(true);
    } else {
      createButton.title = "";
      setRestrictCreation(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const newIndex = getGroupsLength();
    createGroup(name);
    setShowNewGroupForm(false);
    setShowDialDetails(false);
    updateGroupIndex(newIndex);
  };

  return (
    <PopUpModal>
      <h2>New Group</h2>
      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          required
        />
        <div className="ButtonBox">
          <button className="red" onClick={() => setShowNewGroupForm(false)}>
            Cancel
          </button>
          <button
            className="green"
            id="create-button"
            title={tooltip}
            onClick={handleSubmit}
            disabled={restrictCreation}
          >
            Create
          </button>
        </div>
      </form>
    </PopUpModal>
  );
}

export default NewGroupForm;
