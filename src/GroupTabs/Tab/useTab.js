import { useState } from "react";

import useSettingStore from "../../Stores/useSettingStore";
import useRenderStore from "../../Stores/useRenderStore";

function useTab({ idx }) {
  const [showTabMenu, setShowTabMenu] = useState(false);
  const [showDialDetails, setShowDialDetails, setShowDials, resetLoadCount] =
    useRenderStore((state) => {
      return [
        state.showDialDetails,
        state.setShowDialDetails,
        state.setShowDials,
        state.resetLoadCount,
      ];
    });
  const [currentGroupIndex, updateSetting] = useSettingStore((state) => {
    return [state.currentGroupIndex, state.updateSetting];
  });

  function handleTabClick({ target }) {
    const liElement = target.closest("li[data-index]");
    if (liElement && liElement.dataset.index !== currentGroupIndex) {
      setShowDials(false);
      resetLoadCount();
      setShowDialDetails(false);
      updateSetting("currentGroupIndex", liElement.dataset.index);
    } else if (
      liElement &&
      liElement.dataset.index === currentGroupIndex &&
      showDialDetails
    ) {
      resetLoadCount();
      setShowDialDetails(false);
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
