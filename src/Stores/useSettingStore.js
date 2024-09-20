import { create } from "zustand";
import { persist } from "zustand/middleware";

import useRenderStore from "./useRenderStore";

const useSettingStore = create(
  persist(
    (set, get) => ({
      background: "",
      configUrl: "",
      timeEnabled: false,
      timeFormat: "12",
      currentGroupIndex: 0,
      loadedFromStorage: false,
      setLoadedFromStorage: (value) => set({ loadedFromStorage: value }),
      export: () => {
        return {
          background: get().background,
          configUrl: get().configUrl,
          timeEnabled: get().timeEnabled,
          timeFormat: get().timeFormat,
          currentGroupIndex: get().currentGroupIndex,
        };
      },
      updateAllSettings: (settings) => set({ ...settings }),
      updateGroupIndex: (newIndex) => {
        useRenderStore.getState().setShowDials(false);
        set((state) => ({
          ...state,
          currentGroupIndex: parseInt(newIndex),
        }));
      },
      updateSetting: (settingName, settingValue) =>
        set((state) => ({
          ...state,
          [settingName]: settingValue,
        })),
    }),
    {
      name: "dialer-settings",
      onRehydrateStorage: (state) => {
        const storedSettings = localStorage.getItem("dialer-settings");
        return () => {
          if (storedSettings) {
            state.setLoadedFromStorage(true);
          }
        };
      },
    },
  ),
);

export default useSettingStore;
