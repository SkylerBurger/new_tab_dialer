import { useEffect, useRef } from "react";

import "./TabMenu.css";

function TabMenu({ onClose, setShowDetails }) {
  const menuRef = useRef(null);

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
        <li onClick={openDetails}>Edit Group</li>
      </ul>
    </div>
  );
}

export default TabMenu;
