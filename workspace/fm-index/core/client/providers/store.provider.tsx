"use client";

import React, { useCallback, useContext } from "react";
import { IStoreCreate } from "@/core/server/@types/store.type";

import secureLocalStorage from "react-secure-storage";
import storeController from "@/core/server/controllers/store.controller";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Children } from "@/core/server/@types/react-generic.type";

interface StoreProviderProps{
  ProviderCheckAvailabilityStore(subdomain: string):void;
  ProviderStoreCreate(storePayload: IStoreCreate):void;
}

export const StoreContext = React.createContext<StoreProviderProps>({} as StoreProviderProps);

export const StoreProvider = ({children}:Children) => {
  const router = useRouter()

  const ProviderStoreCreate = useCallback(async (storePayload:IStoreCreate) => {
    try {
      const data = await storeController.StoreCreate(storePayload) as any;
      
      if(data?.failed == true){
        return toast.error(data?.message || "Não foi possível realizar a criação da sua loja. Tente novamente mais tarde.")
      }

      secureLocalStorage.setItem("token_store",data.store_token)
      toast.success("Loja criada com sucesso.")
      return router.push('/checkout/complete')
    } catch (error) {
      console.log(error)
      toast.error("Nao foi possivel processar sua requisição no momento. Tente novamente mais tarde!")
    }
  }, []);

  const ProviderCheckAvailabilityStore = useCallback(async (subdomain:string) => {
    try {
      const data = await storeController.CheckAvailability(subdomain) as any;
      
      if(data?.available == false){
        return toast.error(data?.message || "O subdomínio informado não está disponível para cadastro. Tente novamente mais tarde.")
      }

      return toast.success("Subdomínio disponível.")
    } catch (error) {
      toast.error("Nao foi possivel processar sua requisição no momento. Tente novamente mais tarde!")
    }
  }, []);

  return (
    <StoreContext.Provider value={{ProviderCheckAvailabilityStore, ProviderStoreCreate}}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext)