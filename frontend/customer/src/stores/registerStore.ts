import { create } from 'zustand';

type RegisterState = {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  phone: string;
  paymentPassword: string;
  region1: string;
  region2: string;
  region3: string;
  region4: string;
  socialId: string;
  fcmToken: string;
  setRegisterValue: <K extends keyof RegisterState>(field: K, value: RegisterState[K]) => void;
};

const useRegisterPageStore = create<RegisterState>((set) => ({
  email: '',
  password: '',
  passwordCheck: '',
  nickname: '',
  phone: '',
  paymentPassword: '',
  region1: '부산광역시',
  region2: '강서구',
  region3: '신호동',
  region4: '',
  socialId: '', // socialId가 null이거나 빈값("")이면 일반 회원가입으로 취급
  fcmToken: '0', // 플러터에서 제공한 fcm 토큰 가져오기(필수)
  setRegisterValue: (field, value) => set((state) => ({ ...state, [field]: value })),
}));

export default useRegisterPageStore;
