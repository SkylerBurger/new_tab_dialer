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
      getGroupNames: () => get().groups.map((group) => group.name),
      setLoadedFromStorage: (value) => set({ loadedFromStorage: value }),
      createGroup: (groupName) => {
        set({
          ...get().state,
          groups: [...get().groups, { name: groupName, dials: [] }],
        });
      },
      createInitialGroup: () => {
        set({
          ...get().state,
          groups: [{ name: "Default", dials: [] }],
        });
      },
      deleteGroup: (groupName) => {
        const newGroups = get().groups.filter(
          (group) => group.name !== groupName,
        );
        set({
          ...get().state,
          groups: newGroups,
        });
      },
      export: () => get().groups,
      renameGroup: (groupName, newGroupName) => {
        const newGroups = get().groups.map((group) => {
          if (group.name === groupName) {
            return { ...group, name: newGroupName };
          } else {
            return group;
          }
        });
        set({ groups: newGroups });
      },
      shiftGroup: (groupName, steps) => {
        const newGroups = get().groups;
        const groupIndex = newGroups.findIndex(
          (group) => group.name === groupName,
        );
        const newIndex = groupIndex + steps;
        if (0 <= newIndex && newIndex < newGroups.length) {
          const [movedGroup] = newGroups.splice(groupIndex, 1);
          newGroups.splice(newIndex, 0, movedGroup);
          set({ groups: newGroups });
        }
      },
      shiftDial: (groupName, index, offset = null) => {
        const newDials = [
          ...get().groups.find((group) => group.name === groupName).dials,
        ];
        const targetDial = newDials.splice(index, 1)[0];
        if (offset !== null) {
          newDials.splice(index + offset, 0, targetDial);
        }
        get().updateGroup(groupName, newDials);
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
      updateGroup: (groupName, newDials, newGroupName = null) => {
        set({
          groups: get().groups.map((group) => {
            if (group.name === groupName) {
              return {
                name: newGroupName ? newGroupName : group.name,
                dials: newDials,
              };
            } else {
              return group;
            }
          }),
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
