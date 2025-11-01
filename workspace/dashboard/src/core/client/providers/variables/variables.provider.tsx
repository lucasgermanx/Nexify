/* eslint-disable */

import React, { useContext, useState } from "react";

import { IPagination } from "@/@types/general.type";
import { PropsProvider } from "@/core/@types/general.types";
import { useManageStore } from "@/core/client/hooks/select-store-zuustand";
import { createVariableData, deleteVariableData, filterDataVariable, getVariableData, updateVariableData } from "@/core/server/services/variables/variables.service";
import { toast } from "sonner";
import { IVariableCreate, IVariableResponse, IVariables, IVariableUpdate, VariablesContextType } from "./variables-provider.types";

export const VariablesContext = React.createContext<VariablesContextType>(
  {} as VariablesContextType
);

export const VariablesProvider: React.FC<PropsProvider> = ({ children }) => {
  const [variables, setVariables] = useState<IVariables[] | []>()
  const [paginationFilter, setPaginationFilter] = useState<IPagination>()
  const {store_reference} = useManageStore()

  const ProviderGetAllVariables = async (page:string , size?:string) => {
   try {
    const response = await getVariableData(store_reference, page ? page : '1', size ? size : '12')
    
    if(response == undefined || response.failed == true){
      return toast.error("Não foi possível filtrar as variáveis no momento. Tente novamente mais tarde!");
    }

    setVariables(response.variables)
    setPaginationFilter({
      paginationCount: response.paginationCount,
      hasMoreResults: response.hasMoreResults
    })
   } catch (error) {
    console.log(error)
   }
  }

  const ProviderFilterVariables = async (value:string, page:string, size?:string) => {
    try {
     const response = await filterDataVariable(store_reference, value, page ? page : '1', size ? size : '12') as IVariableResponse
     
     if(response == undefined || response.failed == true){
       return toast.error("Não foi possível filtrar as variáveis no momento. Tente novamente mais tarde!");
     }
 
     setVariables(response.variables)
     setPaginationFilter({
       paginationCount: response.paginationCount,
       hasMoreResults: response.hasMoreResults
     })
    } catch (error) {
     console.log(error)
    }
   }

   const ProviderDeleteVariable = async (variable_reference:string) => {
    try {
     const response = await deleteVariableData(variable_reference, store_reference) as IVariableResponse
     
     if(response == undefined || response.failed == true){
       return toast.error(response.message || "Não foi possível deletar a sua variável! Tente novamente mais tarde");
     }
     
     ProviderGetAllVariables('1')
     return toast.success(response.message);
    } catch (error) {
      return toast.error("Não foi possível deletar o seu cupom! Tente novamente mais tarde");
    }
   }


   const ProviderUpdateVariable = async (update:IVariableUpdate) => {
    try {
     const response = await updateVariableData({...update, store_reference:store_reference}) as IVariableResponse
     
     if(response == undefined || response.failed == true){
       return toast.error(response.message || "Não foi possível atualizar sua variável! Tente novamente mais tarde");
     }
     
     ProviderGetAllVariables('1')
     return toast.success(response.message);
    } catch (error) {
      return toast.error("Não foi possível atualizar a sua variável! Tente novamente mais tarde");
    }
   }

   const ProviderCreateVariable = async (dataPayload:IVariableCreate) => {
    try {
     const response = await createVariableData({...dataPayload, store_reference:store_reference}) as IVariableResponse
     
     if(response == undefined || response.failed == true){
       return toast.error(response.message || "Não foi possível criar o seu comando! Tente novamente mais tarde");
     }
     
     ProviderGetAllVariables('1')
     return toast.success(response.message);
    } catch (error) {
      return toast.error("Não foi possível criar o seu comando! Tente novamente mais tarde");
    }
   }

  React.useEffect(()=>{
    ProviderGetAllVariables('1')
  },[store_reference])

  return (
    <VariablesContext.Provider value={{variables, paginationFilter, ProviderFilterVariables, ProviderGetAllVariables, ProviderDeleteVariable, ProviderCreateVariable, ProviderUpdateVariable}}>
      {children}
    </VariablesContext.Provider>
  );
};


export const useVariables = () => useContext(VariablesContext);