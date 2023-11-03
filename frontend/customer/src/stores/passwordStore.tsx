import { create } from 'zustand';

interface PasswordState {
  password: string;
  setPassword: (newPassword: string) => void;
}

const usePasswordStore = create<PasswordState>((set) => ({
  password: '',
  setPassword: (newPassword: string) => set({ password: newPassword }),
}));
export default usePasswordStore;
