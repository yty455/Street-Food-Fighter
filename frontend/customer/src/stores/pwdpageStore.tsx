import { PwdPageKey } from '@/assets/pwdmsg';
import { create } from 'zustand';

type PwdPageState = {
  curPwdPage: number;
  setCurPwdPage: (page: number) => void;
};

const usePwdPageStore = create<PwdPageState>((set) => ({
  curPwdPage: 1 as PwdPageKey,
  setCurPwdPage: (page) => set({ curPwdPage: page }),
}));

export default usePwdPageStore;
