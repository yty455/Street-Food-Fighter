import { create } from 'zustand';

interface CategoryState {
  selectedCategories: string[];
  toggleCategory: (categoryName: string) => void;
  clearCategories: () => void;
}

const useMainFilterStore = create<CategoryState>((set) => ({
  selectedCategories: [],
  toggleCategory: (categoryName) =>
    set((state) => {
      const isAllCategory = categoryName === '메뉴 전체';
      const newCategories = isAllCategory
        ? ['메뉴 전체']
        : state.selectedCategories.includes(categoryName)
        ? state.selectedCategories.filter((name) => name !== categoryName)
        : [...state.selectedCategories.filter((name) => name !== '메뉴 전체'), categoryName];
      return { selectedCategories: newCategories };
    }),
  clearCategories: () => set({ selectedCategories: [] }),
}));

export default useMainFilterStore;
