import { create } from "zustand";
import { persist } from "zustand/middleware";

import useSettingStore from "./useSettingStore";

const useGroupStore = create(
  persist(
    (set, get) => ({
      groups: [],
      loadedFromStorage: false,
      getCurrentGroup: () => {
        return get().groups[useSettingStore.getState().currentGroupIndex];
      },
      setLoadedFromStorage: (value) => set({ loadedFromStorage: value }),
      updateAllGroups: (groups) => set({ groups }),
      updateGroupDials: (groupName, newDials) => {
        set({
          groups: get().groups.map((group) =>
            group.name === groupName ? { ...group, dials: newDials } : group,
          ),
        });
      },
    }),
    {
      name: "dialer-groups",
      onRehydrateStorage: (state) => {
        const storedSettings = localStorage.getItem("dialer-groups");
        return () => {
          if (storedSettings) state.setLoadedFromStorage(true);
        };
      },
    },
  ),
);

export default useGroupStore;
