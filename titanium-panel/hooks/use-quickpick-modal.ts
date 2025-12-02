import { create } from 'zustand';

type useQuickPickStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useQuickPickModal = create<useQuickPickStore>((set) => ({
  isOpen: false,
  onOpen() {
    set({ isOpen: true });
  },
  onClose() {
    set({ isOpen: false });
  },
}));
