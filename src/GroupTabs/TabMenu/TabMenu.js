import { useEffect, useRef } from "react";

import "./TabMenu.css";

function TabMenu({ onClose }) {
  const menuRef = useRef(null);

  // TODO: Remove this
  const mockFunctionality = (name) => {
    console.log(`${name} was selected`);
    if (menuRef.current) menuRef.current.blur();
  };

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.focus();
    }
  });

  return (
    <div ref={menuRef} className="tabMenu" onBlur={onClose} tabIndex={0}>
      <ul>
        <li onClick={() => mockFunctionality("Add")}>Add</li>
        <li onClick={() => mockFunctionality("Mopdify")}>Modify</li>
        <li onClick={() => mockFunctionality("Delete")}>Delete</li>
      </ul>
    </div>
  );
}

export default TabMenu;
