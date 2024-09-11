import { create } from "zustand";

const useRenderStore = create((set) => ({
  showDials: false,
  isPendingChanges: false,
  showSettings: false,
  showConfirmUnsavedNav: false,
  nextIndex: null,
  showNewGroupForm: false,
  setShowNewGroupForm: (value) => set({ showNewGroupForm: value }),
  setNextIndex: (value) => set({ nextIndex: value }),
  setShowConfirmUnsavedNav: (value) => set({ showConfirmUnsavedNav: value }),
  setShowDials: (value) => set({ showDials: value }),
  setIsPendingChanges: (value) => set({ isPendingChanges: value }),
  setShowSettings: (value) => set({ showSettings: value }),
}));

export default useRenderStore;
