import { useEffect, useState } from "react";

import useGroupStore from "../Stores/useGroupStore";

function useDialGroup({ setDialsVisibility }) {
  const [currentGroup] = useGroupStore((state) => [state.currentGroup()]);
  const [loadedImgCount, setLoadedImgCount] = useState(0);

  useEffect(() => {
    setLoadedImgCount(0);
  }, [currentGroup.dials]);

  useEffect(() => {
    if (loadedImgCount === currentGroup.dials.length) {
      setDialsVisibility(true);
    }
  }, [loadedImgCount, currentGroup.dials.length]);

  const handleImgLoad = () => {
    setLoadedImgCount((prev) => prev + 1);
  };

  return { dials: currentGroup.dials, handleImgLoad };
}

export default useDialGroup;
