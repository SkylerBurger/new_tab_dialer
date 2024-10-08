import { useState } from "react";

import useGroupStore from "../../../Stores/useGroupStore";
import useSettingStore from "../../../Stores/useSettingStore";

function useTransferDial(index) {
  const [confirmTransfer, setConfirmTransfer] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
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
    setShowTransfer(false);
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
