import { create } from "zustand";

const useGroupStore = create((set) => ({
  groups: [],
  addGroup: (group) => set((state) => ({ groups: [...state.groups, group] })),
  removeGroup: (group) =>
    set((state) => ({ groups: state.groups.filter((g) => g !== group) })),
  loadFromLocalStorage: () => {
    const config = JSON.parse(localStorage.getItem("dialer-config")) || [];
    if (config.dialGroups) {
      set({ groups: config.dialGroups });
    }
    console.log("Loaded from local storage:", config);
  },
}));

export default useGroupStore;
