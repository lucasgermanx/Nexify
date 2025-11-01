/* eslint-disable */

import React from "react";

import { useManageStore } from "@/core/client/hooks/select-store-zuustand";
import { useStore } from "@/core/client/providers/store/store.provider";
import { updateData, updateFileData } from "@/core/server/services/content/content.service";
import { toast } from "sonner";
import { ContentContextType } from "./@types";

export const ContentContext = React.createContext<ContentContextType | null>(null);

export const ContentProvider = (props: any) => {
  const {store_reference} = useManageStore()
  const {ProviderGetStore} = useStore()
  
  const ProviderUpdateFiles = async (type:string, file: File) => {
    try {
      const response = await updateFileData(store_reference, type, file)

      if(response == undefined || response.failed == true){
        return toast.error(response?.message || "Não foi possível atualizar esse arquivo. Tente novamente mais tarde!");
      }
      ProviderGetStore()
      return toast.success(response.message);
    } catch (error) {
      return toast.error("Não foi possível atualizar esse arquivo! Tente novamente mais tarde");
    }
  };

  const ProviderUpdate = async (data:any) => {
    try {
      const response = await updateData({
        store_reference:store_reference,
        ...data
      })

      if(response == undefined || response.failed == true){
        return toast.error(response?.message || "Não foi possível atualizar as informações enviadas. Tente novamente mais tarde!");
      }

      ProviderGetStore()
      return toast.success(response.message);
    } catch (error) {
      return toast.error("Não foi possível atualizar as informações enviadas. Tente novamente mais tarde!");
    }
  };
  return (
    <ContentContext.Provider value={{ ProviderUpdateFiles, ProviderUpdate }}>
      {props.children}
    </ContentContext.Provider>
  );
};
