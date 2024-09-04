import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSettingStore = create(
  persist(
    (set) => ({
      background: "",
      configUrl: "",
      isPendingChanges: false,
      timeEnabled: false,
      timeFormat: "12",
      currentGroupIndex: 0,
      showSettings: false,
      updateAllSettings: (settings) => set({ ...settings }),
      updateGroupIndex: (newIndex) => {
        set((state) => ({
          ...state,
          currentGroupIndex: parseInt(newIndex),
          dialVisibility: false,
        }));
      },
      updateSetting: (settingName, settingValue) =>
        set((state) => ({
          ...state,
          [settingName]: settingValue,
        })),
      updateShowSettings: (newValue) =>
        set((state) => ({
          ...state,
          showSettings: newValue,
        })),
    }),
    {
      name: "dialer-settings",
      onRehydrateStorage: () => {
        return (state) => {
          state.isPendingChanges = false;
          state.showSettings = false;
          return state;
        };
      },
    },
  ),
);

export default useSettingStore;
