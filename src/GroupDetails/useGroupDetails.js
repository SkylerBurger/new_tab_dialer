import { useEffect, useState } from "react";

import useGroupStore from "../Stores/useGroupStore";
import useSettingStore from "../Stores/useSettingStore";
import useRenderStore from "../Stores/useRenderStore";

export function useGroupDetails({
  showConfirm,
  setShowConfirm,
  setShowDetails,
}) {
  const [showAddDial, setShowAddDial] = useState(false);
  const [groups, updateGroupDials] = useGroupStore((state) => [
    state.groups,
    state.updateGroupDials,
  ]);
  const [isPendingChanges, setIsPendingChanges, setShowSettings] =
    useRenderStore((state) => [
      state.isPendingChanges,
      state.setIsPendingChanges,
      state.setShowSettings,
    ]);
  const [currentGroupIndex, updateSetting] = useSettingStore((state) => {
    return [state.currentGroupIndex, state.updateSetting];
  });
  const { dials, name } = groups[currentGroupIndex];
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

  function forceGroupNavigation(newIndex) {
    setShowConfirm(null);
    setShowDetails(false);
    setIsPendingChanges(false);
    if (newIndex === "settings") {
      setShowSettings(true);
    } else {
      updateSetting("currentGroupIndex", parseInt(newIndex));
    }
  }

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

  const message = "You have unsaved changes.";

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

  return {
    applyChanges,
    confirmOptions,
    isPendingChanges,
    tempDials,
    insertNewDial,
    message,
    name,
    onCancel,
    shiftDial,
    showAddDial,
    setShowAddDial,
    tempName,
    handleNameInput,
  };
}
