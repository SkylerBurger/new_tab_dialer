import { useEffect, useState } from "react";

function useDialGroup({ dials, setDialsVisibility }) {
  const [loadedImgCount, setLoadedImgCount] = useState(0);

  useEffect(() => {
    setLoadedImgCount(0);
  }, [dials]);

  useEffect(() => {
    if (loadedImgCount === dials.length) {
      setDialsVisibility(true);
    }
  }, [loadedImgCount, dials.length]);

  const handleImgLoad = () => {
    setLoadedImgCount((prev) => prev + 1);
  };

  return { handleImgLoad };
}

export default useDialGroup;
