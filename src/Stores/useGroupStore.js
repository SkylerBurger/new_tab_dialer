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
      getGroupsLength: () => get().groups.length,
      setLoadedFromStorage: (value) => set({ loadedFromStorage: value }),
      shiftGroup: (groupName, steps) => {
        const newGroups = get().groups;
        const groupIndex = newGroups.findIndex(
          (group) => group.name === groupName,
        );
        const newIndex = groupIndex + steps;
        if (0 <= newIndex && newIndex < newGroups.length) {
          const [movedGroup] = newGroups.splice(groupIndex, 1);
          newGroups.splice(newIndex, 0, movedGroup);
          useSettingStore.getState().updateGroupIndex(newIndex);
          set({ groups: newGroups });
        }
      },
      transferDial: (fromGroup, dial, toGroup) => {
        const groups = get().groups.map((group) => {
          if (group.name === fromGroup) {
            return {
              ...group,
              dials: group.dials.filter((d) => d !== dial),
            };
          }
          if (group.name === toGroup) {
            return { ...group, dials: [...group.dials, dial] };
          }
          return group;
        });
        set({ groups });
      },
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
