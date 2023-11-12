import { create } from 'zustand';

type OwnerState = {
  isLogin: boolean;
  email: string;
  phone: string;
  ownerName: string;
  bank: string;
  accountNumber: string;
  amount: number;
  ownerId: number;
  stroeName: string;
  category: string; // 가게 카테고리
  businessCategory: string; //푸드트럭 | 포장마차
  openTime: string;
  closeTime: string;
  activeArea: string; // 장소 EX) 부산 강서구 신호동
  lati: number;
  longi: number;
  information: string; // 가게 정보
  introduction: string; //가게 안내
  state: string;
  setRegisterValue: <K extends keyof OwnerState>(field: K, value: OwnerState[K]) => void;
  setOwnerValue: (data: any) => void;
  setStoreValue: (data: any) => void;
  setLogin: () => void;
  setLogout: () => void;
};

const OwnerInfoStore = create<OwnerState>((set) => ({
  isLogin: false,
  email: '',
  phone: '',
  ownerName: '',
  bank: '',
  accountNumber: '',
  amount: 0,
  ownerId: 0,
  stroeName: '',
  category: '', // 가게 카테고리
  businessCategory: '', //푸드트럭 | 포장마차
  openTime: '',
  closeTime: '',
  activeArea: '', // 장소 EX) 부산 강서구 신호동
  lati: 0.0,
  longi: 0.0,
  information: '', // 가게 정보
  introduction: '', //가게 안내
  state: '',
  setLogin: () => set((state) => ({ ...state, ['isLogin']: true })),
  setLogout: () => set((state) => ({ ...state, ['isLogin']: false })),
  setRegisterValue: (field, value) => set((state) => ({ ...state, [field]: value })),
  setOwnerValue: (value) =>
    set((state) => ({
      ...state,
      accountNumber: value.accountNumber,
      amount: value.amount,
      bank: value.bank,
      email: value.email,
      ownerName: value.name,
      phone: value.phone,
    })),
  setStoreValue: (value) =>
    set((state) => ({
      ...state,
      ownerId: value.ownerId,
      activeArea: value.activeArea,
      businessCategory: value.businessCategory,
      category: value.category,
      closeTime: value.closeTime,
      information: value.information,
      introduction: value.introduction,
      lati: value.lati,
      longi: value.longi,
      openTime: value.openTime,
      state: value.state,
    })),
}));

export default OwnerInfoStore;
