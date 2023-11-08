import { create } from 'zustand';

type RegisterState = {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  phone: string;
  setRegisterValue: <K extends keyof RegisterState>(field: K, value: RegisterState[K]) => void;
};

const useRegisterPageStore = create<RegisterState>((set) => ({
  email: '',
  password: '',
  passwordCheck: '',
  nickname: '',
  phone: '',
  setRegisterValue: (field, value) => set((state) => ({ ...state, [field]: value })),
}));

export default useRegisterPageStore;
