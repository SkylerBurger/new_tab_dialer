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

  const dials = groups[currentGroupIndex].dials;
  const groupName = groups[currentGroupIndex].name;
  const groupCount = groups.length;

  const [showAddDial, setShowAddDial] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [tempName, setTempName] = useState("Default");

  const confirmDeleteOptions = {
    options: [
      {
        label: "Cancel",
        action: () => setShowConfirmDelete(false),
        color: "#4CAF50",
      },
      {
        label: "Delete",
        action: () => handleDeleteGroup(groupName),
        color: "#f44336",
      },
    ],
    message: "Are you sure you want to delete this group?",
  };

  const insertNewDial = (dialName, icon, link) => {
    console.log(`insertNewDial(${dialName}, ${icon}, ${link})`);
    console.log(`groupName: ${groupName}`);
    const newDial = { name: dialName, icon, link };
    const newDials = [...dials, newDial];
    updateGroup(groupName, newDials);
  };

  const handleNameInput = (e) => {
    setTempName(e.target.value);
  };

  const handleDeleteGroup = (targetGroupName) => {
    deleteGroup(targetGroupName);
    setShowConfirmDelete(false);
    setShowDialDetails(false);
    updateGroupIndex(0);
  };

  return {
    dials,
    confirmDeleteOptions,
    groupCount,
    insertNewDial,
    groupName,
    showAddDial,
    showConfirmDelete,
    setShowAddDial,
    setShowConfirmDelete,
    tempName,
    handleNameInput,
  };
}
