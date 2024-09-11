import { useState } from "react";

import PopUpModal from "../../Common/PopUpModal/PopUpModal";

function NewDialForm({ insertNewDial, setShowAddDial }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [link, setLink] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleIconChange = (e) => setIcon(e.target.value);
  const handleLinkChange = (e) => setLink(e.target.value);

  const handleAdd = () => {
    insertNewDial(name, icon, link);
    setShowAddDial(false);
  };

  return (
    <PopUpModal>
      <div className="NewDialForm">
        <h2>New Dial</h2>
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
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
