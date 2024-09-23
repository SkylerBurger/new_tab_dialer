import { useEffect } from "react";

import useGroupStore from "../Stores/useGroupStore";
import useRenderStore from "../Stores/useRenderStore";
import useSettingStore from "../Stores/useSettingStore";

function useGroup() {
  const [groups] = useGroupStore((state) => [state.groups]);
  const [showDials, setShowDials] = useRenderStore((state) => [
    state.showDials,
    state.setShowDials,
  ]);
  const [currentGroupIndex] = useSettingStore((state) => [
    state.currentGroupIndex,
  ]);
  const currentGroup = groups[currentGroupIndex];

  useEffect(() => {
    if (!currentGroup) return;

    let timeoutId;

    const checkImages = () => {
      const imgElements = document.querySelectorAll(".Group img");
      let loadedCount = 0;

      imgElements.forEach((img) => {
        if (img.complete) loadedCount++;
      });

      if (loadedCount === currentGroup.dials.length) {
        setShowDials(true);
      } else {
        timeoutId = setTimeout(checkImages, 100);
      }
    };
    // Initial Check
    checkImages();
    // Return cleanup function if timeout was set
    if (timeoutId) {
      return () => clearTimeout(timeoutId);
    }
  }, [currentGroupIndex, groups, setShowDials, currentGroup]);

  if (!currentGroup) {
    return { dials: [] };
  }
  return { dials: currentGroup.dials, showDials };
}

export default useGroup;
