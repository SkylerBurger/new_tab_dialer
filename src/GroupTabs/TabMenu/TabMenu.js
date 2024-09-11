import { useEffect, useRef } from "react";

import useGroupStore from "../../Stores/useGroupStore";
import useRenderStore from "../../Stores/useRenderStore";

import "./TabMenu.css";

function useTabMenu({ name }) {
  const menuRef = useRef(null);
  const [setShowNewGroupForm, setShowDialDetails, isPendingChanges] =
    useRenderStore((state) => [
      state.setShowNewGroupForm,
      state.setShowDialDetails,
      state.isPendingChanges,
    ]);
  const [shiftGroup, getGroupsLength] = useGroupStore((state) => [
    state.shiftGroup,
    state.getGroupsLength,
  ]);

  const openDetails = (event) => {
    event.stopPropagation();
    setShowDialDetails(true);
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

  return {
    menuRef,
    openDetails,
    handleShiftGroup,
    getGroupsLength,
    setShowNewGroupForm,
    isPendingChanges,
  };
}

function TabMenu({ idx, name, onClose }) {
  const {
    menuRef,
    openDetails,
    handleShiftGroup,
    getGroupsLength,
    setShowNewGroupForm,
    isPendingChanges,
  } = useTabMenu({ name });

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
        {!isPendingChanges && (
          <li onClick={() => setShowNewGroupForm(true)}>Create New Group</li>
        )}
      </ul>
    </div>
  );
}

export default TabMenu;
