import { create } from 'zustand';

type UserInfoState = {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  phone: string;
  paypassword: string;
  setRegisterValue: <K extends keyof UserInfoState>(field: K, value: UserInfoState[K]) => void;
};

const useInfoStore = create<UserInfoState>((set) => ({
  email: '',
  password: '',
  passwordCheck: '',
  nickname: '',
  phone: '',
  paypassword: '',
  setRegisterValue: (field, value) => set((state) => ({ ...state, [field]: value })),
}));

export default useInfoStore;
