import { useEffect, useState } from "react";

import useGroupStore from "../Stores/useGroupStore";

function useDialGroup() {
  const [currentGroup] = useGroupStore((state) => [state.getCurrentGroup()]);
  const [loadedImgCount, setLoadedImgCount] = useState(0);
  const [showDials, setShowDials] = useState(false);

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
