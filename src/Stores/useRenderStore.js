import { create } from "zustand";

const useRenderStore = create((set) => ({
  showDials: false,
  showSettings: false,
  showNewGroupForm: false,
  showDialDetails: false,
  showWelcome: false,
  setShowWelcome: (value) => set({ showWelcome: value }),
  setShowDialDetails: (value) => set({ showDialDetails: value }),
  setShowNewGroupForm: (value) => set({ showNewGroupForm: value }),
  setShowDials: (value) => set({ showDials: value }),
  setShowSettings: (value) => set({ showSettings: value }),
}));

export default useRenderStore;
