import { useState } from "react";

import useGroupStore from "../../Stores/useGroupStore";
import useSettingStore from "../../Stores/useSettingStore";
import useRenderStore from "../../Stores/useRenderStore";

export function useGroupDetails() {
  const [groups, deleteGroup, updateGroup] = useGroupStore((state) => [
    state.groups,
    state.deleteGroup,
    state.updateGroup,
  ]);
  const [setShowDialDetails] = useRenderStore((state) => [
    state.setShowDialDetails,
  ]);
  const [currentGroupIndex, updateGroupIndex] = useSettingStore((state) => {
    return [state.currentGroupIndex, state.updateGroupIndex];
  });

  const { dials, name } = groups[currentGroupIndex];
  const groupCount = groups.length;

  const [showAddDial, setShowAddDial] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [tempName, setTempName] = useState(name);

  const confirmDeleteOptions = {
    options: [
      {
        label: "Cancel",
        action: () => setShowConfirmDelete(false),
        color: "#4CAF50",
      },
      {
        label: "Delete",
        action: () => handleDeleteGroup(name),
        color: "#f44336",
      },
    ],
    message: "Are you sure you want to delete this group?",
  };

  const insertNewDial = (name, icon, link) => {
    const newDial = { name, icon, link };
    const newDials = [...dials, newDial];
    updateGroup(name, newDials);
  };

  const handleNameInput = (e) => {
    setTempName(e.target.value);
  };

  const handleDeleteGroup = (groupName) => {
    deleteGroup(groupName);
    setShowConfirmDelete(false);
    setShowDialDetails(false);
    updateGroupIndex(0);
  };

  return {
    dials,
    confirmDeleteOptions,
    groupCount,
    insertNewDial,
    name,
    showAddDial,
    showConfirmDelete,
    setShowAddDial,
    setShowConfirmDelete,
    tempName,
    handleNameInput,
  };
}
