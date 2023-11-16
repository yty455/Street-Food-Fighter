import { create } from 'zustand';

interface OptionState {
  menuId: number;
  optionIds: number[];
  count: number;
}

interface OptionStore {
  order: OptionState[];
  addOption: (menuId: number, optionId: number) => void;
  removeOption: (menuId: number, optionId: number) => void;
  setQuantity: (menuId: number, count: number) => void;
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
        if (!menu.optionIds.includes(optionId)) {
          menu.optionIds = [...menu.optionIds, optionId];
        }
        newOrder[menuIndex] = menu;
      } else {
        const newMenu = { menuId, optionIds: [optionId], count: 0 };
        newOrder.push(newMenu);
      }

      return { order: newOrder };
    }),

  removeOption: (menuId, optionId) =>
    set((state) => {
      const existingMenu = state.order.find((menu) => menu.menuId === menuId);
      if (existingMenu) {
        existingMenu.optionIds = existingMenu.optionIds.filter((id) => id !== optionId);
      }
      return { order: [...state.order] };
    }),

  setQuantity: (menuId, count) =>
    set((state) => {
      const menuIndex = state.order.findIndex((menu) => menu.menuId === menuId);
      if (menuIndex > -1) {
        if (count > 0) {
          state.order[menuIndex].count = count;
        } else {
          state.order.splice(menuIndex, 1);
        }
      } else if (count > 0) {
        state.order.push({ menuId, optionIds: [], count });
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
