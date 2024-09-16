import { useState } from "react";

import PopUpModal from "../../Common/PopUpModal/PopUpModal";

function NewDialForm({ insertNewDial, setShowAddDial }) {
  const [dialName, setDialName] = useState("");
  const [icon, setIcon] = useState("");
  const [link, setLink] = useState("");

  const handleDialNameChange = (e) => setDialName(e.target.value);
  const handleIconChange = (e) => setIcon(e.target.value);
  const handleLinkChange = (e) => setLink(e.target.value);

  const handleAdd = () => {
    insertNewDial(dialName, icon, link);
    setShowAddDial(false);
  };

  return (
    <PopUpModal>
      <div className="NewDialForm">
        <h2>New Dial</h2>
        <div>
          <label>Dial Name</label>
          <input
            type="text"
            placeholder="Dial Name"
            value={dialName}
            onChange={handleDialNameChange}
          />
        </div>
        <div>
          <label>Icon URL</label>
          <input
            type="text"
            placeholder="Icon"
            value={icon}
            onChange={handleIconChange}
          />
        </div>
        <div>
          <label>Link URL</label>
          <input
            type="text"
            placeholder="Link"
            value={link}
            onChange={handleLinkChange}
          />
        </div>
        <div className="buttonBox">
          <button className="red" onClick={() => setShowAddDial(false)}>
            Cancel
          </button>
          <button className="green" onClick={handleAdd}>
            Create Dial
          </button>
        </div>
      </div>
    </PopUpModal>
  );
}

export default NewDialForm;
