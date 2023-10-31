import { create } from 'zustand';

interface OptionState {
  menuId: number;
  selectedOptions: number[];
  quantity: number;
}

interface OptionStore {
  order: OptionState[];
  addOption: (menuId: number, optionId: number) => void;
  removeOption: (menuId: number, optionId: number) => void;
  setQuantity: (menuId: number, quantity: number) => void;
  clearOrder: () => void;
}

const useOrderStore = create<OptionStore>((set) => ({
  order: [],
  addOption: (menuId, optionId) =>
    set((state) => {
      let existingMenu = state.order.find((menu) => menu.menuId === menuId);
      if (existingMenu) {
        if (!existingMenu.selectedOptions.includes(optionId)) {
          existingMenu.selectedOptions.push(optionId);
        }
      } else {
        existingMenu = { menuId, selectedOptions: [optionId], quantity: 0 };
        state.order.push(existingMenu);
      }
      return { order: [...state.order] };
    }),

  removeOption: (menuId, optionId) =>
    set((state) => {
      const existingMenu = state.order.find((menu) => menu.menuId === menuId);
      if (existingMenu) {
        existingMenu.selectedOptions = existingMenu.selectedOptions.filter((id) => id !== optionId);
      }
      return { order: [...state.order] };
    }),

  setQuantity: (menuId, quantity) =>
    set((state) => {
      const menuIndex = state.order.findIndex((menu) => menu.menuId === menuId);
      if (menuIndex > -1) {
        if (quantity > 0) {
          state.order[menuIndex].quantity = quantity;
        } else {
          state.order.splice(menuIndex, 1);
        }
      }
      return { order: [...state.order] };
    }),

  clearOrder: () => {
    set(() => ({ order: [] }));
  },
}));

export default useOrderStore;
