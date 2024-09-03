import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSettingsStore = create(
  persist(
    (set) => ({
      settings: {
        background: "",
        configUrl: "",
        isPendingChanges: false,
        timeEnabled: false,
        timeFormat: "12",
        currentGroupIndex: 0,
      },
      updateSettings: (settings) => set({ settings }),
    }),
    {
      name: "dialer-settings",
    },
  ),
);

export default useSettingsStore;
