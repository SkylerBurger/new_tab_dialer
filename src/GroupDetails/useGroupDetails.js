import { useEffect, useState } from "react";

export function useGroupDetails({
  groupDials,
  setIsPendingChanges,
  showConfirm,
  setShowConfirm,
  setShowDetails,
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
    const newDials = [...dials];
    const dial = newDials.splice(index, 1)[0];
    newDials.splice(index + offset, 0, dial);
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
    updateGroupIndex(newIndex);
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

  return {
    applyChanges,
    confirmOptions,
    dials,
    message,
    shiftDial,
  };
}
