import { useState } from "react";

import useSettingStore from "../../Stores/useSettingStore";
import useRenderStore from "../../Stores/useRenderStore";

function useTab({ idx }) {
  const [showTabMenu, setShowTabMenu] = useState(false);
  const [setShowDials, setShowDialDetails] = useRenderStore((state) => {
    return [state.setShowDials, state.setShowDialDetails];
  });
  const [currentGroupIndex, updateSetting] = useSettingStore((state) => {
    return [state.currentGroupIndex, state.updateSetting];
  });

  function handleTabClick({ target }) {
    const liElement = target.closest("li[data-index]");
    if (liElement) {
      setShowDialDetails(false);
      setShowDials(true);
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
