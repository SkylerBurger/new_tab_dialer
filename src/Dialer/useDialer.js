import useSettingStore from "../Stores/useSettingStore";
import useRenderStore from "../Stores/useRenderStore";

export function useDialer() {
  const [showDialDetails, showNewGroupForm] = useRenderStore((state) => [
    state.showDialDetails,
    state.showNewGroupForm,
  ]);
  const [timeEnabled, timeFormat] = useSettingStore((state) => [
    state.timeEnabled,
    state.timeFormat,
  ]);

  return {
    showDialDetails,
    showNewGroupForm,
    timeEnabled,
    timeFormat,
  };
}
