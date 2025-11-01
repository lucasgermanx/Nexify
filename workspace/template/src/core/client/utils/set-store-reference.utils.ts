import { create } from 'zustand';

type Store = {
  store_reference: string | null;
  setStoreReference: (store_reference: string) => void;
};

const storeReference = create<Store>((set) => ({
  store_reference: null,
  setStoreReference: (store_reference: string) => set({ store_reference: store_reference }),
}));

export default storeReference;
