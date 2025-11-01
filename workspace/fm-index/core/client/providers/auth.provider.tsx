"use client";

import { ILogin, IRegisterAccount } from "@/core/server/@types/auth.type";
import React, { useCallback, useContext, useState } from "react";

import { Children } from "@/core/server/@types/react-generic.type";
import { IUser } from "@/core/server/@types/user.type";
import AuthController from "@/core/server/controllers/auth.controller";
import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";
import { toast } from "sonner";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: '/' });

interface AuthProviderProps {
  user: IUser;
  ProviderLogin(dataPayload: ILogin): void;
  ProviderRegister(dataPayload: IRegisterAccount): void;
  ProviderActivateAccount(token: string): void;
  ProviderResendActivateAccount(): void;
  ProviderGetUser():void;
  ProviderRecoverAccount(email:string):void;
  ProviderConfirmRecoverToken(token:string):void;
  ProviderResetPassword(password:string, confirm_password:string):void;
}

export const AuthContext = React.createContext<AuthProviderProps>({} as AuthProviderProps);

export const AuthProvider = ({children}:Children) => {
  const router = useRouter()
  const [user, setUser] = useState<IUser | undefined>();

  const ProviderLogin = useCallback(async (dataPayload: ILogin) => {
    try {
      const data = await AuthController.Login(dataPayload) as any;
      
      if(data?.failed == true){
        if(data?.activated == false){
          secureLocalStorage.setItem("fm_mail", dataPayload.email)
          router.push("/auth/activate")
        }
        return toast.error(data?.message || "Verifique os dados informados! Não foi possivel realizar o login")
      }

      cookies.set("fm_token", data?.token, { path: '/', domain: '.fivemarket.com.br' });

      toast.success("Usuario autenticado com sucesso.")
      return router.push("/")
    } catch (error) {
      console.log(error)
      toast.error("Nao foi possivel processar seu login no momento. Tente novamente mais tarde!")
    }
  }, [])

  const ProviderRegister = useCallback((async (dataPayload: IRegisterAccount) => {
    try {
      const data = await AuthController.Register(dataPayload) as any;
      
      if(data?.failed == true){
        return toast.error(data?.message || "Verifique os dados informados! Não foi possivel realizar o seu cadastro")
      }

      secureLocalStorage.setItem("fm_mail", dataPayload.email);
      
      toast.success("Usuario registrado com sucesso. Ative sua conta!")
      return router.push("/auth/activate")
    } catch (error) {
      toast.error("Nao foi possivel processar seu cadastro no momento. Tente novamente mais tarde!")
    }
  }),[]);

  const ProviderActivateAccount = useCallback(async (token:string) => {
    try {
      const data = await AuthController.ActivateAccount({
        email: secureLocalStorage.getItem("fm_mail") as string,
        token:token
      }) as any;
      
      if(data?.failed == true){
        return toast.error(data?.message || "Verifique os dados informados! Não foi possivel ativar sua conta!")
      }

      secureLocalStorage.clear()

      toast.success("Conta ativada com sucesso! Realize seu login")
      return router.push("/auth/login")
    } catch (error) {
      toast.error("Nao foi possivel ativar sua conta. Tente novamente mais tarde!")
    }
  },[]);

  const ProviderResendActivateAccount = useCallback(async () => {
    try {
      const data = await AuthController.ResendActivateAccount(secureLocalStorage.getItem("fm_mail") as string) as any;
      
      if(data?.failed == true){
        return toast.error(data?.message || "Verifique os dados informados! Não foi possivel ativar sua conta!")
      }

      toast.success(data?.message)
    } catch (error) {
      toast.error("Nao foi possivel ativar sua conta. Tente novamente mais tarde!")
    }
  },[]);

  const ProviderGetUser = useCallback(async () => {
    try {
      if(!cookies.get("fm_token"))
        return
      
      const data = await AuthController.GetDataUser(cookies.get("fm_token")) as any;
      
      setUser(data?.user)
    } catch (error) {
    }
  }, []);

  const ProviderRecoverAccount = useCallback(async (email:string) => {
    try {
      const data = await AuthController.recoverAccount(email) as any;
      
      if(data?.failed == true){
        return toast.error(data?.message || "Verifique os dados informados! Não foi possivel ativar sua conta!")
      }

      secureLocalStorage.setItem("fm_mail", email);
      toast.success(data?.message)
      return router.push("/auth/recover/confirm")
    } catch (error) {
      toast.error("Nao foi possivel recuperar sua conta. Tente novamente mais tarde!")
    }
  },[]);

  const ProviderConfirmRecoverToken = useCallback(async(token:string) => {
    try {
      const data = await AuthController.confirmRecoverToken(secureLocalStorage.getItem("fm_mail") as string, token) as any;
      
      if(data?.failed == true){
        return toast.error(data?.message || "Verifique os dados informados! Não foi possivel confirmar o token!")
      }

      secureLocalStorage.setItem("fm_recover_token", token);
      return router.push("/auth/recover/password")
    } catch (error) {
      toast.error("Nao foi possivel recuperar sua conta. Tente novamente mais tarde!")
    }
  }, []);

  const ProviderResetPassword = useCallback(async(password:string, confirm_password:string) => {
    try {
      const data = await AuthController.resetPassword(password, confirm_password,secureLocalStorage.getItem("fm_recover_token") as string, secureLocalStorage.getItem("fm_mail") as string) as any;
      
      if(data?.failed == true){
        return toast.error(data?.message || "Verifique os dados informados! Não foi possivel confirmar o token!")
      }

      secureLocalStorage.clear()
      toast.success(data?.message)
      return router.push("/auth/login")
    } catch (error) {
      toast.error("Nao foi possivel recuperar sua conta. Tente novamente mais tarde!")
    }
  },[])

  React.useEffect(()=>{
    ProviderGetUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user: user as IUser, ProviderLogin, ProviderRegister, ProviderActivateAccount, ProviderResendActivateAccount, ProviderRecoverAccount, ProviderConfirmRecoverToken, ProviderResetPassword, ProviderGetUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)