import { Store } from "@/@types/store.type"

export const filterDefaultStore = (stores:Store[], defaultStore:string) =>{
    return stores?.filter(item=>item.store_reference == defaultStore)
}