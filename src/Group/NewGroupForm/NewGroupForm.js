import useRenderStore from "../../Stores/useRenderStore";
import useGroupStore from "../../Stores/useGroupStore";
import PopUpModal from "../../Common/PopUpModal/PopUpModal";

function NewGroupForm() {
  const setShowNewGroupForm = useRenderStore(
    (state) => state.setShowNewGroupForm,
  );
  const createGroup = useGroupStore((state) => state.createGroup);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    createGroup(name);
    setShowNewGroupForm(false);
  };

  return (
    <PopUpModal>
      <h2>New Group</h2>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
        <div className="ButtonBox">
          <button onClick={() => setShowNewGroupForm(false)}>Cancel</button>
          <button onClick={handleSubmit}>Create</button>
        </div>
      </form>
    </PopUpModal>
  );
}

export default NewGroupForm;
