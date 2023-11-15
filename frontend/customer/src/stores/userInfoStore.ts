import { create } from 'zustand';

email: 'test@test.com';
grade: 'LIGHT';
imageUrl: '';
nickname: '김변경';
phone: '010-0000-0000';
region1: '경상남도';
region2: '김해시';
region3: '관동동';
region4: '몰라용';
role: 'USER';
socialType: null;

type UserInfoState = {
  email: string;
  grade: string;
  imageUrl: string;
  nickname: string;
  phone: string;
  region1: string;
  region2: string;
  region3: string;
  region4: string;
  setUserInfoValue: <K extends keyof UserInfoState>(field: K, value: UserInfoState[K]) => void;
  setUserInfo: (data: UserInfoState) => void;
};

const userInfoStore = create<UserInfoState>((set) => ({
  email: '',
  grade: 'LIGHT',
  imageUrl: '',
  nickname: '',
  phone: '',
  region1: '',
  region2: '',
  region3: '',
  region4: '',
  setUserInfoValue: (field, value) => set((state) => ({ ...state, [field]: value })),
  setUserInfo: (data) => set(() => data),
}));

export default userInfoStore;
