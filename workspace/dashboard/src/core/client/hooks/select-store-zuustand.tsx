import { devtools, persist } from 'zustand/middleware';

import { getStoreLocalStorage } from '@/core/utils/GetStoreLocalStorage';
import { create } from "zustand";

type Store = {
  store_reference: string;
  setStoreReference: (store_reference: string) => void;
};

export const useManageStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        store_reference: getStoreLocalStorage(),
        setStoreReference:  (store_reference:string) => set(()=>({store_reference: store_reference}))
      }),
      {
        name: "defaultStore",
        partialize: (state) => ({store_reference: state.store_reference})
      }
    )
  )
);