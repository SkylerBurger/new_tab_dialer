import { create } from "zustand";

const useRenderStore = create((set) => ({
  showDials: false,
  isPendingChanges: false,
  showSettings: false,
  toggleDials: () => set((state) => ({ showDials: !state.showDials })),
  setIsPendingChanges: (value) => set({ isPendingChanges: value }),
  setShowSettings: (value) => set({ showSettings: value }),
  toggleSettings: () => set((state) => ({ showSettings: !state.showSettings })),
}));

export default useRenderStore;
