import { useEffect, useRef } from "react";

import "./TabMenu.css";

function TabMenu({ onClose, setShowDetails }) {
  const menuRef = useRef(null);

  // TODO: Remove this
  const mockFunctionality = (event, name) => {
    event.stopPropagation();
    console.log(`${name} was selected`);
    if (menuRef.current) menuRef.current.blur();
  };

  const openDetails = (event) => {
    event.stopPropagation();
    setShowDetails(true);
    if (menuRef.current) menuRef.current.blur();
  };

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.focus();
    }
  });

  return (
    <div ref={menuRef} className="TabMenu" onBlur={onClose} tabIndex={0}>
      <ul>
        <li onClick={(e) => mockFunctionality(e, "Add Dial")}>Add Dial</li>
        <li onClick={openDetails}>Edit Group</li>
        <li onClick={(e) => mockFunctionality(e, "New Group")}>New Group</li>
      </ul>
    </div>
  );
}

export default TabMenu;
