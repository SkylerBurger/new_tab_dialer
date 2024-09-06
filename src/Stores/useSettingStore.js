import { create } from "zustand";
import { persist } from "zustand/middleware";

import useRenderStore from "./useRenderStore";

const useSettingStore = create(
  persist(
    (set) => ({
      background: "",
      configUrl: "",
      timeEnabled: false,
      timeFormat: "12",
      currentGroupIndex: 0,
      loadedFromStorage: false,
      setLoadedFromStorage: (value) => set({ loadedFromStorage: value }),
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
