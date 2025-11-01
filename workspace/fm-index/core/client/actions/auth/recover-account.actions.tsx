import React, { useState } from "react";

import { AlterPasswordValidator } from "../../validators/AlterPasswordValidator";
import { AuthValidator } from "../../validators/AuthValidator";
import { FormHandler } from "../../handlers/FormHandler";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../../providers/auth.provider";

export const RecoverAccountActions = () => {
  const {ProviderRecoverAccount} = useAuth()
  const [dataForm, setDataForm] = useState<any>({
    email: "",
  });

  const { AuthValidators, getErrorByType } = AuthValidator();
  const { addForm } = FormHandler(AuthValidators, setDataForm);

  const HandlerRecover = async () => {
    await ProviderRecoverAccount(dataForm.email)
  };

  return { addForm, dataForm, getErrorByType, HandlerRecover };
};

export const ConfirmTokenAccountActions = () => {
  const searchParams = useSearchParams()
  const {ProviderConfirmRecoverToken} = useAuth()
  const [otp, setOTP] = useState("");


  const HandlerOTP = async () => {
    ProviderConfirmRecoverToken(otp)
  };

  const ResendToken = async () => {
    console.log(otp);
  };

  React.useEffect(() => {
    const token = searchParams.get("token");
    if (token !== null) {
        setOTP(token);
    }
  }, [searchParams.get("token")]);

  return { HandlerOTP, setOTP, otp, ResendToken };
};

export const AlterPasswordAction = () => {
  const {ProviderResetPassword} = useAuth()
  const [dataForm, setDataForm] = useState<any>({
    password:"",
    confirm_password:""
  });

  const { AlterPasswordValidators, getErrorByType } = AlterPasswordValidator();
  const { addForm } = FormHandler(AlterPasswordValidators, setDataForm);

  const handlerResetPassword = async () => {
    ProviderResetPassword(dataForm.password, dataForm.confirm_password)
  };

  return {addForm, dataForm, getErrorByType, handlerResetPassword}
}