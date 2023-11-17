import { create } from 'zustand';

interface VendorStore {
  vendorId: number | null;
  setVendorId: (id: number | null) => void;
}

export const useVendorStore = create<VendorStore>((set) => ({
  vendorId: null,
  setVendorId: (id) => set({ vendorId: id }),
}));
