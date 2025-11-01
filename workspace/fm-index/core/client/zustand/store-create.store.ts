import { create } from 'zustand'

type Store = {
  store_token: string
  setStoreToken: (store_token:string) => void
}

export const storeCreate = create<Store>()((set) => ({
  store_token: '',
  setStoreToken: (store_token) => set(() => ({ store_token: store_token })),
}))