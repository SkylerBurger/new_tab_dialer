import { useEffect } from "react";

import useGroupStore from "../Stores/useGroupStore";
import useRenderStore from "../Stores/useRenderStore";
import useSettingStore from "../Stores/useSettingStore";

function useGroup() {
  const [groups] = useGroupStore((state) => [state.groups]);
  const [loadCount, incrementLoadCount, showDials, setShowDials] =
    useRenderStore((state) => [
      state.loadCount,
      state.incrementLoadCount,
      state.showDials,
      state.setShowDials,
    ]);
  const [currentGroupIndex] = useSettingStore((state) => [
    state.currentGroupIndex,
  ]);
  const currentGroup = groups[currentGroupIndex];

  useEffect(() => {
    setShowDials(false);
  }, [currentGroupIndex]);

  useEffect(() => {
    if (currentGroup && loadCount === 0 && currentGroup.dials.length > 0) {
      setShowDials(false);
    } else if (currentGroup && loadCount === currentGroup.dials.length) {
      setShowDials(true);
    }
  }, [loadCount, currentGroup]);

  if (!currentGroup) {
    return { dials: [] };
  }
  return { dials: currentGroup.dials, showDials, incrementLoadCount };
}

export default useGroup;
