import { create } from 'zustand';
import PostWishListAPI from '@/apis/user/PostWishListAPI';
import DeleteWishListAPI from '@/apis/user/DeleteWishListAPI';
import GetWishListAPI from '@/apis/user/GetWishListAPI';

interface CategoryState {
  selectedCategories: string[];
  toggleCategory: (categoryName: string) => void;
  clearCategories: () => void;
  refreshWishList: () => void;
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
  refreshWishList: async () => {
    try {
      const data = await GetWishListAPI();
      const selectedCategories: string[] = [];
      data.response.map((name: any) => selectedCategories.push(name.foodType));
      set({ selectedCategories }); // 상태 업데이트
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  },
}));

export default useWishListStore;
