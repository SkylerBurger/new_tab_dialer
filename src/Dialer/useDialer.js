import useSettingStore from "../Stores/useSettingStore";
import useRenderStore from "../Stores/useRenderStore";

export function useDialer() {
  const [showDialDetails, showNewGroupForm, showReorderGroups] = useRenderStore(
    (state) => [
      state.showDialDetails,
      state.showNewGroupForm,
      state.showReorderGroups,
    ],
  );
  const [timeEnabled, timeFormat] = useSettingStore((state) => [
    state.timeEnabled,
    state.timeFormat,
  ]);

  return {
    showDialDetails,
    showNewGroupForm,
    showReorderGroups,
    timeEnabled,
    timeFormat,
  };
}
