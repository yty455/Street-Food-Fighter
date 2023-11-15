import { create } from 'zustand';

type RegisterState = {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  phone: string;
  paypassword: string;
  region1: string;
  region2: string;
  region3: string;
  region4: string;
  setRegisterValue: <K extends keyof RegisterState>(field: K, value: RegisterState[K]) => void;
};

const useRegisterPageStore = create<RegisterState>((set) => ({
  email: '',
  password: '',
  passwordCheck: '',
  nickname: '',
  phone: '',
  paypassword: '',
  region1: '부산광역시',
  region2: '강서구',
  region3: '신호동',
  region4: '',
  setRegisterValue: (field, value) => set((state) => ({ ...state, [field]: value })),
}));

export default useRegisterPageStore;
