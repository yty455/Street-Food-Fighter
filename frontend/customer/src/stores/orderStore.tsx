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
  removeItem: (menuId: number) => void;
}

const useOrderStore = create<OptionStore>((set) => ({
  order: [],
  addOption: (menuId, optionId) =>
    set((state) => {
      const newOrder = [...state.order];
      const menuIndex = newOrder.findIndex((menu) => menu.menuId === menuId);

      if (menuIndex > -1) {
        const menu = { ...newOrder[menuIndex] };
        if (!menu.selectedOptions.includes(optionId)) {
          menu.selectedOptions = [...menu.selectedOptions, optionId];
        }
        newOrder[menuIndex] = menu;
      } else {
        const newMenu = { menuId, selectedOptions: [optionId], quantity: 0 };
        newOrder.push(newMenu);
      }

      return { order: newOrder };
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
      } else if (quantity > 0) {
        state.order.push({ menuId, selectedOptions: [], quantity });
      }
      return { order: [...state.order] };
    }),

  clearOrder: () => {
    set(() => ({ order: [] }));
  },
  removeItem: (menuId) =>
    set((state) => {
      return { order: state.order.filter((menu) => menu.menuId !== menuId) };
    }),
}));

export default useOrderStore;