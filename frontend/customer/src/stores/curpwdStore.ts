import { create } from 'zustand';

interface PasswordState {
  currentPassword: string;
  setCurrentPassword: (password: string) => void;
  resetCurrentPassword: () => void;
}

const useCurPasswordStore = create<PasswordState>((set) => ({
  currentPassword: '',
  setCurrentPassword: (password) => set({ currentPassword: password }),
  resetCurrentPassword: () => set({ currentPassword: '' }),
}));

export default useCurPasswordStore;
