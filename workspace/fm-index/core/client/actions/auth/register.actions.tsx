import { FormHandler } from "../../handlers/FormHandler";
import { RegisterValidator } from "../../validators/RegisterValidator";
import { useAuth } from "@/core/client/providers/auth.provider";

import { useState } from "react";

export const AuthRegisterAction = () => {
  const {ProviderRegister} = useAuth()
  const [dataForm, setDataForm] = useState<any>({
    name:"",
    email:"",
    password:"",
    user_discord:"",
    cpf:""
  });

  const { RegisterValidators, getErrorByType } = RegisterValidator();
  const { addForm } = FormHandler(RegisterValidators, setDataForm);

  const HandlerRegister = async () => {
    ProviderRegister(dataForm)
  };
  
  return {addForm, dataForm, getErrorByType, HandlerRegister}
};
