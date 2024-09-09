import { useState } from "react";

import useSettingStore from "../../Stores/useSettingStore";
import useRenderStore from "../../Stores/useRenderStore";

function useTab({ idx, setShowConfirm, setShowDetails }) {
  const [showTabMenu, setShowTabMenu] = useState(false);
  const [isPendingChanges, setShowDials] = useRenderStore((state) => {
    return [state.isPendingChanges, state.setShowDials];
  });
  const [currentGroupIndex, updateSetting] = useSettingStore((state) => {
    return [state.currentGroupIndex, state.updateSetting];
  });

  function handleTabClick({ target }) {
    const liElement = target.closest("li[data-index]");
    if (liElement && isPendingChanges) {
      setShowConfirm({ newIndex: liElement.dataset.index });
    } else if (liElement && liElement.dataset.index !== currentGroupIndex) {
      setShowDetails(false);
      setShowDials(false);
      updateSetting("currentGroupIndex", liElement.dataset.index);
    }
  }

  function openMenu(event) {
    event.stopPropagation();
    setShowTabMenu(true);
  }

  function closeMenu() {
    setShowTabMenu(false);
  }

  const isSelected = idx === parseInt(currentGroupIndex);

  return {
    closeMenu,
    openMenu,
    isSelected,
    handleTabClick,
    showTabMenu,
  };
}

export default useTab;
