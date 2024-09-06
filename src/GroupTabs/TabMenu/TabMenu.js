import { useEffect, useRef } from "react";

import useGroupStore from "../../Stores/useGroupStore";

import "./TabMenu.css";

function TabMenu({ idx, name, onClose, setShowDetails }) {
  const menuRef = useRef(null);
  const [shiftGroup, getGroupsLength] = useGroupStore((state) => [
    state.shiftGroup,
    state.getGroupsLength,
  ]);

  const openDetails = (event) => {
    event.stopPropagation();
    setShowDetails(true);
    if (menuRef.current) menuRef.current.blur();
  };

  const handleShiftGroup = (steps, event) => {
    event.stopPropagation();
    shiftGroup(name, steps);
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
        {idx !== 0 && (
          <li onClick={(e) => handleShiftGroup(-1, e)}>Move Group Left</li>
        )}
        {idx !== getGroupsLength() - 1 && (
          <li onClick={(e) => handleShiftGroup(1, e)}>Move Group Right</li>
        )}
      </ul>
    </div>
  );
}

export default TabMenu;
