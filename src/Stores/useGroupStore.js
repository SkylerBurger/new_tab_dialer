import { create } from "zustand";
import { persist } from "zustand/middleware";

import useSettingStore from "./useSettingStore";

const useGroupStore = create(
  persist(
    (set, get) => ({
      groups: [],
      currentGroup: () => {
        return get().groups[useSettingStore.getState().currentGroupIndex];
      },
      updateAllGroups: (groups) => set({ groups }),
    }),
    {
      name: "dialer-groups",
    },
  ),
);

export default useGroupStore;
