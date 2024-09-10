import { useState } from "react";

import useGroupStore from "../../Stores/useGroupStore";
import useSettingStore from "../../Stores/useSettingStore";
import useRenderStore from "../../Stores/useRenderStore";

function useTransferDial(index, shiftDial) {
  const [confirmTransfer, setConfirmTransfer] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [setShowConfirmUnsavedNav] = useRenderStore((state) => [
    state.setShowConfirmUnsavedNav,
  ]);
  const [currentGroupIndex] = useSettingStore((state) => [
    state.currentGroupIndex,
  ]);
  const [groups, transferDial] = useGroupStore((state) => [
    state.groups,
    state.transferDial,
  ]);
  const groupNames = groups.map((group) => group.name);
  const currentGroup = groups[currentGroupIndex];

  const handleTransfer = () => {
    const toGroup = document.getElementById("toGroup").value;
    // UI Flags
    setConfirmTransfer(false);
    setShowConfirmUnsavedNav(false);
    setShowTransfer(false);
    // Remove dial from temp and real array of dials
    shiftDial(index, null);
    transferDial(currentGroup.name, currentGroup.dials[index], toGroup);
  };

  return {
    confirmTransfer,
    setConfirmTransfer,
    showTransfer,
    setShowTransfer,
    groupNames,
    currentGroup,
    handleTransfer,
  };
}

export default useTransferDial;
