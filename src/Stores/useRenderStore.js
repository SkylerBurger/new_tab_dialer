import { create } from "zustand";

const useRenderStore = create((set) => ({
  loadCount: 0,
  showSettings: false,
  showNewGroupForm: false,
  showDialDetails: false,
  showWelcome: false,
  showDials: false,
  setShowDials: (value) => set({ showDials: value }),
  resetLoadCount: () => set({ loadCount: 0 }),
  incrementLoadCount: () =>
    set((state) => ({ loadCount: state.loadCount + 1 })),
  setShowWelcome: (value) => set({ showWelcome: value }),
  setShowDialDetails: (value) => set({ showDialDetails: value }),
  setShowNewGroupForm: (value) => set({ showNewGroupForm: value }),
  setShowSettings: (value) => set({ showSettings: value }),
}));

export default useRenderStore;
