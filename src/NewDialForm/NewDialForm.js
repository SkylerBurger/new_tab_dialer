import { useState } from "react";

import "./NewDialForm.css";

export function NewDialForm({ insertNewDial, setShowAddDial }) {
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
    <div className="NewDialForm">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder="Icon"
        value={icon}
        onChange={handleIconChange}
      />
      <input
        type="text"
        placeholder="Link"
        value={link}
        onChange={handleLinkChange}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
