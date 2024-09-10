import { useEffect, useState } from "react";

import useGroupStore from "../Stores/useGroupStore";
import useSettingStore from "../Stores/useSettingStore";
import useRenderStore from "../Stores/useRenderStore";

export function useGroupDetails({
  showConfirm,
  setShowConfirm,
  setShowDetails,
}) {
  const [groups, deleteGroup, updateGroupDials] = useGroupStore((state) => [
    state.groups,
    state.deleteGroup,
    state.updateGroupDials,
  ]);
  const [isPendingChanges, setIsPendingChanges, setShowSettings] =
    useRenderStore((state) => [
      state.isPendingChanges,
      state.setIsPendingChanges,
      state.setShowSettings,
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
  const message = "You have unsaved changes.";

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
    setShowDetails(false);
    setIsPendingChanges(false);
  };

  const forceGroupNavigation = (newIndex) => {
    setShowConfirm(null);
    setShowDetails(false);
    setIsPendingChanges(false);
    if (newIndex === "settings") {
      setShowSettings(true);
    } else {
      updateSetting("currentGroupIndex", parseInt(newIndex));
    }
  };

  const confirmOptions = [
    {
      label: "Return to Apply Changes",
      action: () => setShowConfirm(null),
      color: "#4CAF50",
    },
    {
      label: "Continue Without Saving",
      action: () => forceGroupNavigation(showConfirm.newIndex),
      color: "#f44336",
    },
  ];

  const onCancel = () => {
    setIsPendingChanges(false);
    setShowDetails(false);
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
    setShowDetails(false);
    setIsPendingChanges(false);
    updateGroupIndex(0);
  };

  return {
    applyChanges,
    confirmOptions,
    groupCount,
    isPendingChanges,
    tempDials,
    insertNewDial,
    message,
    name,
    onCancel,
    shiftDial,
    showAddDial,
    showConfirmDelete,
    setShowAddDial,
    setShowConfirmDelete,
    tempName,
    handleNameInput,
    handleDeleteGroup,
  };
}
