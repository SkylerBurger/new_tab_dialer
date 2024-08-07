import { useEffect, useState } from "react";

function useDialGroup(groupDials, setDialVisibility) {
  const [loadedImgCount, setLoadedImgCount] = useState(0);

  useEffect(() => {
    setLoadedImgCount(0);
  }, [groupDials]);

  useEffect(() => {
    if (loadedImgCount === groupDials.length) {
      setDialVisibility(true);
    }
  }, [loadedImgCount, groupDials.length]);

  const handleImgLoad = () => {
    setLoadedImgCount((prev) => prev + 1);
  };

  return { handleImgLoad };
}

export default useDialGroup;
