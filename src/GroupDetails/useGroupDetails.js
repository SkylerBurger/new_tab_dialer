import { useEffect, useState } from "react";

export function useGroupDetails({
  groupDials,
  setShowDetails,
  updateGroupDials,
}) {
  const [dials, setDials] = useState([...groupDials]);
  const [isPendingChanges, setIsPendingChanges] = useState(false);

  const arraysEqual = (a, b) => a.length === b.length && a.every((val, index) => val === b[index]);

  useEffect(() => {
    setIsPendingChanges(arraysEqual(groupDials, dials) ? false : true);
  }, [dials, groupDials])

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

  return {
    dials,
    isPendingChanges,
    shiftDial,
    applyChanges,
  };
}
