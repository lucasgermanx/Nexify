import React, { useState } from "react";

import { AuthValidator } from "../../validators/AuthValidator";
import { FormHandler } from "../../handlers/FormHandler";
import secureLocalStorage from "react-secure-storage";
import { toast } from "sonner";
import { useAuth } from "@/core/client/providers/auth.provider";

import {useSearchParams} from "next/navigation";

export const AuthActivateAction = () => {
  const searchParams = useSearchParams()
  const {ProviderActivateAccount, ProviderResendActivateAccount} = useAuth()
  const [otp, setOTP] = useState("");
  const [noEmail, setNoEmail] = useState(false)
  const [dataForm, setDataForm] = useState<any>({
    email: "",
  });

  const { AuthValidators, getErrorByType } = AuthValidator();
  const { addForm } = FormHandler(AuthValidators, setDataForm);

  const HandlerOTP = async () => {    
      if(secureLocalStorage.getItem("fm_mail") == null){
        toast.warning("Ei, ei! Seu destino está ansioso para encontrá-lo! Mas primeiro, seu e-mail precisa de um GPS para chegar lá. Insira-o no campo!")
        setNoEmail(true)
        return
      }
     await ProviderActivateAccount(otp);
  };


  const HandlerEmail = async () => {
    setNoEmail(false)
    secureLocalStorage.setItem("fm_mail", dataForm.email)
    return  toast.success("Email adicionado! Prossiga.")
  }

  const ResendToken = async () =>{
    if(secureLocalStorage.getItem("fm_mail") == null){
      toast.warning("Ei ei! Precisamos do seu email para continuar. Insira ela no campo")
      setNoEmail(true)
      return
    }
    await ProviderResendActivateAccount()
  }


  React.useEffect(() => {
    const token = searchParams.get("token");
    if (token !== null) {
        setOTP(token);
    }
}, [searchParams.get("token")]);

  
  return { HandlerOTP, setOTP, otp, ResendToken, noEmail, addForm, dataForm, getErrorByType, HandlerEmail, setNoEmail};
};
