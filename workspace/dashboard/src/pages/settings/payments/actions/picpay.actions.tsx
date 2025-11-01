import { useStore } from "@/core/client/providers/store/store.provider";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const PicPayModalAction = () => {
  const [showModalPicPay, setShowModalPicPay] = useState(false);

  const actionModalPicpay = () => {
    setShowModalPicPay(true);
  };

  const closeModalPicpay = () => {
    setShowModalPicPay(false);
  };

  return { actionModalPicpay, closeModalPicpay, showModalPicPay };
};



export const PicPayDataAction = () => {
  const { register, handleSubmit, setValue } = useForm();
  const {ProviderUpdateDataPayments} = useStore()
  
  const onSubmit = (data: any) => {
    ProviderUpdateDataPayments('picpay', data)
  };

  const formPicPay = {
    register, 
    handleSubmit, 
    onSubmit, 
    setValue
  }

  return {formPicPay}
}