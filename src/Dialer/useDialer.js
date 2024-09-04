import { useState } from "react";

import useSettingStore from "../Stores/useSettingStore";

export function useDialer() {
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirm, setShowConfirm] = useState(null);
  const [timeEnabled, timeFormat] = useSettingStore((state) => [
    state.timeEnabled,
    state.timeFormat,
  ]);

  return {
    showDetails,
    setShowDetails,
    showConfirm,
    setShowConfirm,
    timeEnabled,
    timeFormat,
  };
}
