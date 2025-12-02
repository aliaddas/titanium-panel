import { create } from 'zustand';

interface HideHeaderState {
  hideHeader: boolean;
  setHideHeader: (value: boolean) => void;
}

const useHideHeader = create<HideHeaderState>((set) => ({
  hideHeader: false,
  setHideHeader: (value: boolean) => set({ hideHeader: value }),
}));

export default useHideHeader;