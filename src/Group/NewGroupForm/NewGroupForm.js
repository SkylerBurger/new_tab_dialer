import useRenderStore from "../../Stores/useRenderStore";
import useGroupStore from "../../Stores/useGroupStore";
import useSettingStore from "../../Stores/useSettingStore";
import PopUpModal from "../../Common/PopUpModal/PopUpModal";

function NewGroupForm() {
  const setShowNewGroupForm = useRenderStore(
    (state) => state.setShowNewGroupForm,
  );
  const updateGroupIndex = useSettingStore((state) => state.updateGroupIndex);
  const [createGroup, getGroupsLength] = useGroupStore((state) => {
    return [state.createGroup, state.getGroupsLength];
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const newIndex = getGroupsLength();
    createGroup(name);
    setShowNewGroupForm(false);
    updateGroupIndex(newIndex);
  };

  return (
    <PopUpModal>
      <h2>New Group</h2>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
        <div className="ButtonBox">
          <button className="red" onClick={() => setShowNewGroupForm(false)}>
            Cancel
          </button>
          <button className="green" onClick={handleSubmit}>
            Create
          </button>
        </div>
      </form>
    </PopUpModal>
  );
}

export default NewGroupForm;
