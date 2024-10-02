import { useEffect, useRef } from "react";

import useRenderStore from "../../Stores/useRenderStore";

import "./TabMenu.css";

function useTabMenu() {
  const menuRef = useRef(null);
  const [setShowNewGroupForm, setShowDialDetails, setShowReorderGroups] =
    useRenderStore((state) => [
      state.setShowNewGroupForm,
      state.setShowDialDetails,
      state.setShowReorderGroups,
    ]);

  const openFactory = (setShowFunc) => {
    return (event) => {
      event.stopPropagation();
      setShowFunc(true);
      if (menuRef.current) menuRef.current.blur();
    };
  };

  const openDetails = openFactory(setShowDialDetails);
  const openReorderGroups = openFactory(setShowReorderGroups);
  const openNewGroupForm = openFactory(setShowNewGroupForm);

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.focus();
    }
  });

  return {
    menuRef,
    openDetails,
    openNewGroupForm,
    openReorderGroups,
  };
}

function TabMenu({ onClose }) {
  const { menuRef, openDetails, openNewGroupForm, openReorderGroups } =
    useTabMenu();

  return (
    <div ref={menuRef} className="TabMenu" onBlur={onClose} tabIndex={0}>
      <ul>
        <li onClick={openDetails}>Edit Group</li>
        <li onClick={openReorderGroups}>Edit Order</li>
        <li onClick={openNewGroupForm}>Create New Group</li>
      </ul>
    </div>
  );
}

export default TabMenu;
