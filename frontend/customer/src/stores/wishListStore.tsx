import { create } from 'zustand';
import PostWishListAPI from '@/apis/user/PostWishListAPI';
import DeleteWishListAPI from '@/apis/user/DeleteWishListAPI';

interface CategoryState {
  selectedCategories: string[];
  toggleCategory: (categoryName: string) => void;
  clearCategories: () => void;
}

const useWishListStore = create<CategoryState>((set) => ({
  selectedCategories: [],
  toggleCategory: (categoryName) =>
    set((state) => {
      if (state.selectedCategories.includes(categoryName)) {
        DeleteWishListAPI(categoryName);
        return { selectedCategories: state.selectedCategories.filter((name) => name !== categoryName) };
      }
      PostWishListAPI(categoryName);
      return { selectedCategories: [...state.selectedCategories, categoryName] };
    }),
  clearCategories: () => set({ selectedCategories: [] }),
}));

export default useWishListStore;
