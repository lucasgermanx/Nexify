import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface BearState {
  store_id: string
  defineStore: (by: string) => void
}

export const useDefaultStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        store_id: '0',
        defineStore: (by) => set(() => ({ store_id: by})),
      }),
      {
        name: 'defaultStore',
        partialize: (state) => ({ store_id: state.store_id }),
      }
    )
  )
)