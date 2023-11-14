import { create } from 'zustand';

interface CategoryState {
  selectedCategories: string[];
  toggleCategory: (categoryName: string) => void;
  clearCategories: () => void;
}

const useWishListStore = create<CategoryState>((set) => ({
  selectedCategories: [],
  toggleCategory: (categoryName) =>
    set((state) => {
      const newCategories = state.selectedCategories.includes(categoryName)
        ? state.selectedCategories.filter((name) => name !== categoryName)
        : [...state.selectedCategories, categoryName];
      return { selectedCategories: newCategories };
    }),
  clearCategories: () => set({ selectedCategories: [] }),
}));

export default useWishListStore;
