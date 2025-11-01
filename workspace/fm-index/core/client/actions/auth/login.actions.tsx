import { AuthValidator } from "../../validators/AuthValidator";
import { FormHandler } from "../../handlers/FormHandler";
import { useAuth } from "@/core/client/providers/auth.provider";

import { useState } from "react";

export const AuthLoginAction = () => {
  const {ProviderLogin} = useAuth()
  const [dataForm, setDataForm] = useState<any>({
    email: "",
    password: "",
  });

  const { AuthValidators, getErrorByType } = AuthValidator();
  const { addForm } = FormHandler(AuthValidators, setDataForm);

  const HandlerLogin = async () => {
    await ProviderLogin({...dataForm});
  };
  
  return {addForm, dataForm, getErrorByType, HandlerLogin}
};
