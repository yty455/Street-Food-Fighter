import { create } from 'zustand';

type RegisterState = {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
  phone: string;
  bank: string;
  accountNumber: string;
  openHour: number;
  openMinute: number;
  closeHour: number;
  closeMinute: number;
  businessCategory: string;
  category: string;
  storeName: string;
  setRegisterValue: <K extends keyof RegisterState>(field: K, value: RegisterState[K]) => void;
};

const useRegisterPageStore = create<RegisterState>((set) => ({
  email: '',
  password: '',
  passwordCheck: '',
  name: '',
  bank: '',
  phone: '',
  accountNumber: '',
  openHour: 0,
  openMinute: 0,
  closeHour: 0,
  closeMinute: 0,
  businessCategory: '포장마차',
  category: 'HOTTEOK',
  storeName: '',
  setRegisterValue: (field, value) => set((state) => ({ ...state, [field]: value })),
}));

export default useRegisterPageStore;
