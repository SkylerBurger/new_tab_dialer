import { useEffect, useState } from "react";

import useGroupStore from "../Stores/useGroupStore";
import useSettingStore from "../Stores/useSettingStore";

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
  const [currentGroupIndex, isPendingChanges, updateSetting] = useSettingStore(
    (state) => {
      return [
        state.currentGroupIndex,
        state.isPendingChanges,
        state.updateSetting,
      ];
    },
  );
  const { dials, name } = groups[currentGroupIndex];
  const [tempDials, setTempDials] = useState([...dials]);

  const arraysEqual = (a, b) =>
    a.length === b.length && a.every((val, index) => val === b[index]);

  useEffect(() => {
    updateSetting(
      "isPendingChanges",
      arraysEqual(dials, tempDials) ? false : true,
    );
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
    updateSetting("isPendingChanges", false);
  };

  function forceGroupNavigation(newIndex) {
    setShowConfirm(null);
    setShowDetails(false);
    updateSetting("isPendingChanges", false);
    if (newIndex === "settings") {
      updateSetting("showSettings", true);
    } else {
      updateSetting("currentGroupIndex", newIndex);
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
    updateSetting("isPendingChanges", false);
    setShowDetails(false);
  };

  const insertNewDial = (name, icon, link) => {
    setTempDials([...tempDials, { name, icon, link }]);
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
  };
}
