import { useEffect, useState } from "react";

export function useGroupDetails({
  dials,
  setIsPendingChanges,
  showConfirm,
  setShowConfirm,
  setShowDetails,
  setShowSettings,
  updateGroupDials,
  updateGroupIndex,
}) {
  const [tempDials, setTempDials] = useState([...dials]);
  const [showAddDial, setShowAddDial] = useState(false);

  const arraysEqual = (a, b) =>
    a.length === b.length && a.every((val, index) => val === b[index]);

  useEffect(() => {
    setIsPendingChanges(arraysEqual(dials, tempDials) ? false : true);
  }, [tempDials, dials]);

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
    updateGroupDials(groupName, dials);
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
      updateGroupIndex(newIndex);
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

  return {
    applyChanges,
    confirmOptions,
    tempDials,
    insertNewDial,
    message,
    onCancel,
    shiftDial,
    showAddDial,
    setShowAddDial,
  };
}
