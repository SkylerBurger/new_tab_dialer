import useSettingStore from "../Stores/useSettingStore";
import useRenderStore from "../Stores/useRenderStore";

export function useDialer() {
  const [showDialDetails] = useRenderStore((state) => [state.showDialDetails]);
  const [timeEnabled, timeFormat] = useSettingStore((state) => [
    state.timeEnabled,
    state.timeFormat,
  ]);

  return {
    showDialDetails,
    timeEnabled,
    timeFormat,
  };
}
