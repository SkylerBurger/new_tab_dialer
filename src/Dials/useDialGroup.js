import { useEffect, useState } from "react";

import useGroupStore from "../Stores/useGroupStore";
import useRenderStore from "../Stores/useRenderStore";

function useDialGroup() {
  const [currentGroup] = useGroupStore((state) => [state.getCurrentGroup()]);
  const [showDials, setShowDials] = useRenderStore((state) => [
    state.showDials,
    state.setShowDials,
  ]);
  const [loadedImgCount, setLoadedImgCount] = useState(0);

  useEffect(() => {
    setLoadedImgCount(0);
  }, [currentGroup]);

  useEffect(() => {
    if (currentGroup && loadedImgCount === currentGroup.dials.length) {
      setShowDials(true);
    }
  }, [loadedImgCount, currentGroup]);

  const handleImgLoad = () => {
    setLoadedImgCount((prev) => prev + 1);
  };

  if (!currentGroup) {
    return { dials: [] };
  }
  return { dials: currentGroup.dials, handleImgLoad, showDials };
}

export default useDialGroup;
