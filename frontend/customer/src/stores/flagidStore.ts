import { create } from 'zustand';

type flagidState = {
  flagId: number | null;
  setFlagId: (id: number) => void;
};
const useFlagIdStore = create<flagidState>((set) => ({
  flagId: null,
  setFlagId: (id) => set({ flagId: id }),
}));

export default useFlagIdStore;
