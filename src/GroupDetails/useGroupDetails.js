import { useEffect, useState } from "react";

import useGroupStore from "../Stores/useGroupStore";
import useSettingStore from "../Stores/useSettingStore";
import useRenderStore from "../Stores/useRenderStore";

export function useGroupDetails() {
  const [groups, deleteGroup, updateGroupDials] = useGroupStore((state) => [
    state.groups,
    state.deleteGroup,
    state.updateGroupDials,
  ]);
  const [
    isPendingChanges,
    setIsPendingChanges,
    setShowSettings,
    showConfirmUnsavedNav,
    setShowConfirmUnsavedNav,
    nextIndex,
    setShowDialDetails,
  ] = useRenderStore((state) => [
    state.isPendingChanges,
    state.setIsPendingChanges,
    state.setShowSettings,
    state.showConfirmUnsavedNav,
    state.setShowConfirmUnsavedNav,
    state.nextIndex,
    state.setShowDialDetails,
  ]);
  const [currentGroupIndex, updateGroupIndex, updateSetting] = useSettingStore(
    (state) => {
      return [
        state.currentGroupIndex,
        state.updateGroupIndex,
        state.updateSetting,
      ];
    },
  );

  const { dials, name } = groups[currentGroupIndex];
  const groupCount = groups.length;

  const [showAddDial, setShowAddDial] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [tempDials, setTempDials] = useState([...dials]);
  const [tempName, setTempName] = useState(name);

  const arraysEqual = (a, b) =>
    a.length === b.length && a.every((val, index) => val === b[index]);

  useEffect(() => {
    const changeDetected = !arraysEqual(dials, tempDials) || tempName !== name;
    setIsPendingChanges(changeDetected);
  }, [tempDials, dials, tempName]);

  const shiftDial = (index, offset) => {
    // If offset is null, the dial is deleted rather than shifted
    const newDials = [...tempDials];
    const targetDial = newDials.splice(index, 1)[0];
    if (offset !== null) {
      newDials.splice(index + offset, 0, targetDial);
    }
    setTempDials(newDials);
  };

  const applyChanges = (groupName, dials) => {
    const newGroupName = tempName !== groupName ? tempName : null;
    updateGroupDials(groupName, newGroupName, dials);
    setShowDialDetails(false);
    setIsPendingChanges(false);
  };

  const forceGroupNavigation = (newIndex) => {
    setShowConfirmUnsavedNav(false);
    setShowDialDetails(false);
    setIsPendingChanges(false);
    if (newIndex === "settings") {
      setShowSettings(true);
    } else {
      updateSetting("currentGroupIndex", parseInt(newIndex));
    }
  };

  const confirmUnsavedNavOptions = {
    options: [
      {
        label: "Return to Apply Changes",
        action: () => setShowConfirmUnsavedNav(false),
        color: "#4CAF50",
      },
      {
        label: "Continue Without Saving",
        action: () => forceGroupNavigation(nextIndex),
        color: "#f44336",
      },
    ],
    message: "You have unsaved changes.",
  };

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

  const onCancel = () => {
    setIsPendingChanges(false);
    setShowDialDetails(false);
  };

  const insertNewDial = (name, icon, link) => {
    setTempDials([...tempDials, { name, icon, link }]);
  };

  const handleNameInput = (e) => {
    setTempName(e.target.value);
  };

  const handleDeleteGroup = (groupName) => {
    deleteGroup(groupName);
    setShowConfirmDelete(false);
    setShowDialDetails(false);
    setIsPendingChanges(false);
    updateGroupIndex(0);
  };

  return {
    applyChanges,
    confirmDeleteOptions,
    confirmUnsavedNavOptions,
    groupCount,
    isPendingChanges,
    tempDials,
    insertNewDial,
    name,
    onCancel,
    shiftDial,
    showAddDial,
    showConfirmDelete,
    setShowAddDial,
    setShowConfirmDelete,
    tempName,
    handleNameInput,
    showConfirmUnsavedNav,
  };
}
