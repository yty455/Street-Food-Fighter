import { create } from 'zustand';

type RegisterState = {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
  phone: string;
  bank: string;
  accountNumber: string;
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
  setRegisterValue: (field, value) => set((state) => ({ ...state, [field]: value })),
}));

export default useRegisterPageStore;
