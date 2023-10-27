import { create } from 'zustand';

interface SelectedDateState {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

const useSelectedDateStore = create<SelectedDateState>((set) => ({
  selectedDate: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
}));

export default useSelectedDateStore;
