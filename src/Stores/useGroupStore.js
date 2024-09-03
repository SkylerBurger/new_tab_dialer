import { create } from "zustand";
import { persist } from "zustand/middleware";

const useGroupStore = create(
  persist(
    (set) => ({
      groups: [],
      updateGroups: (groups) => set({ groups }),
    }),
    {
      name: "dialer-groups",
    },
  ),
);

export default useGroupStore;
