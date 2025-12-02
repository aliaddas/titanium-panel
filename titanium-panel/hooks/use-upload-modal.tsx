/* eslint-disable @typescript-eslint/naming-convention */
import { create } from 'zustand';

type useUploadModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useUploadModal = create<useUploadModalProps>((set) => ({
  isOpen: false,
  onOpen() {
    set({ isOpen: true });
  },
  onClose() {
    set({ isOpen: false });
  },
}));
