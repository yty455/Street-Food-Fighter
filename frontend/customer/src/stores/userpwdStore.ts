import { create } from 'zustand';
interface PayPwdState {
  payPassword: string | null;
  setPayPassword: (password: string) => void;
}
const usePayPwdStore = create<PayPwdState>((set) => ({
  payPassword: '123456',
  setPayPassword: (password: string) => set({ payPassword: password }),
}));

export default usePayPwdStore;
