/* eslint-disable */

import { updateUser, updateUserPassword } from "@/core/server/services/user/user.service";

import { PropsProvider } from "@/core/@types/general.types";
import React, { useContext } from "react";
import { toast } from "sonner";
import { UserContextType, userUpdate, userUpdatePassword } from "./user-provider.types";

export const UserContext = React.createContext<UserContextType>(
    {} as UserContextType
);

export const UserProvider: React.FC<PropsProvider> = ({ children }) => {

    const ProviderUpdateUser = async (data:userUpdate) => {
        try {
            const response = await updateUser(data)
            
            if(response == undefined || response.failed == true){
                return toast.error(response?.message || "Não foi possível atualizar os dados do usuário. Tente novamente mais tarde!");
            }

            toast.success("Dados atualizados com sucesso!")
        } catch (error) {
            return toast.error("Não foi possível prosseguir com essa operação! Tente novamente mais tarde");
        }
    }

    const ProviderUpdatePasswordUser = async (data:userUpdatePassword) => {
        try {
            const response = await updateUserPassword(data)
            
            if(response == undefined || response.failed == true){
                return toast.error(response?.message || "Não foi possível atualizar os dados do usuário. Tente novamente mais tarde!");
            }

            toast.success("Senha atualizada com sucecesso!")
        } catch (error) {
            return toast.error("Não foi possível prosseguir com essa operação! Tente novamente mais tarde");
        }
    }

  return (
    <UserContext.Provider value={{ProviderUpdateUser, ProviderUpdatePasswordUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);