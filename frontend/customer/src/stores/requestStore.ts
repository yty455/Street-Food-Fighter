import { create } from 'zustand';

type RequestState = {
  finalRequest: string;
  setFinalRequest: (request: string) => void;
};

export const useRequestStore = create<RequestState>((set) => ({
  finalRequest: '',
  setFinalRequest: (finalRequest) => set({ finalRequest }),
}));
