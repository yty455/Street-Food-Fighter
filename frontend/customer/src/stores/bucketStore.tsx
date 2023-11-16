import { BucketType } from '@/types/bucket.type';
import { create } from 'zustand';

type StoreState = {
  bucket: BucketType | null;
  setBucket: (bucket: BucketType) => void;
};

const useBucketStore = create<StoreState>((set) => ({
  bucket: null,
  setBucket: (bucket) => set({ bucket }),
}));

export default useBucketStore;
