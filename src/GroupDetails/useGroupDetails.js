import { useEffect, useState } from "react";

export function useGroupDetails({
  groupDials,
  setIsPendingChanges,
  showConfirm,
  setShowConfirm,
  setShowDetails,
  setShowSettings,
  updateGroupDials,
  updateGroupIndex,
}) {
  const [dials, setDials] = useState([...groupDials]);

  const arraysEqual = (a, b) =>
    a.length === b.length && a.every((val, index) => val === b[index]);

  useEffect(() => {
    setIsPendingChanges(arraysEqual(groupDials, dials) ? false : true);
  }, [dials, groupDials]);

  const shiftDial = (index, offset) => {
    // If offset is null, the dial is deleted rather than shifted
    const newDials = [...dials];
    const dial = newDials.splice(index, 1)[0];
    if (offset !== null) {
      newDials.splice(index + offset, 0, dial);
    }
    setDials(newDials);
  };

  const applyChanges = (groupName, dials) => {
    updateGroupDials(groupName, dials);
    setShowDetails(false);
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

  return {
    applyChanges,
    confirmOptions,
    dials,
    message,
    onCancel,
    shiftDial,
  };
}
