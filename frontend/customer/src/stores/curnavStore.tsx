import { create } from 'zustand';

type NavState = {
  curnav: number;
  setCurnav: (id: number) => void;
};

export const useNavStore = create<NavState>((set) => ({
  curnav: 1,
  setCurnav: (id = 1) => set({ curnav: id }),
}));
