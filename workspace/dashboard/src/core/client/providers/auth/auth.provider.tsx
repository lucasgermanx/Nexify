import { PropsProvider } from "@/core/@types/general.types";
import { getUserData } from "@/core/server/services/auth/auth.service";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "universal-cookie";
import { AuthContextType, User } from "./auth-provider.types";

export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType,
);

const cookies = new Cookies();

export const AuthProvider: React.FC<PropsProvider> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();

  const getUserAccount = async () => {
    try {
      const token = cookies.get("fm_token");
      if (!token) {
        window.location.href = "https://localhost:5173/auth/login";
      }

      const data = await getUserData(token)

      if (data.failed == true) {
        console.log("redirect")
      }

      setUser(data.user)
    } catch (error) {
      console.log(error)
      toast.error("Houve um problema ao processar os dados do seu usuário! Se o problema persistir entre em contato com o administrador.")
    }
  };

  const loggoutAccount = async () => {
    cookies.remove('fm_token', { path: '/' });
    window.location.href = "https://localhost:5173/auth/login";
  }

  useEffect(() => {
    getUserAccount()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loggoutAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);