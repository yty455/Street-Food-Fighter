import { create } from 'zustand';

interface PasswordStoreState {
  password: string;
  wantPwd: string;
  againPwd: string;
  setPassword: (curPwdPage: number, newPassword: string) => void;
  resetPasswords: () => void;
}

const usePasswordStore = create<PasswordStoreState>((set) => ({
  password: '',
  wantPwd: '',
  againPwd: '',
  setPassword: (curPwdPage, newPassword) =>
    set((state) => {
      if (curPwdPage === 1) {
        return { ...state, password: newPassword };
      } else if (curPwdPage === 2) {
        return { ...state, wantPwd: newPassword };
      } else if (curPwdPage === 3) {
        return { ...state, againPwd: newPassword };
      }
      return state;
    }),
  resetPasswords: () => set({ password: '', wantPwd: '', againPwd: '' }),
}));

export default usePasswordStore;
