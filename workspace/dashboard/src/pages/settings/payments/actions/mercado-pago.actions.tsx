import { useStore } from "@/core/client/providers/store/store.provider";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const MercadoPagoModalActions = () => {
    const [showModalMercadoPago, setShowModalMercadoPago] = useState(false);
  
    const showModalAction = () => {
      setShowModalMercadoPago(true);
    };
  
    const closeModalAction = () => {
      setShowModalMercadoPago(false);
    };
  
    return { showModalAction, closeModalAction, showModalMercadoPago }
  }

export const MercadoPagoDataAction = () => {
  const { register, handleSubmit, setValue } = useForm();
  const {ProviderUpdateDataPayments} = useStore()

  const onSubmit = (data: any) => {
    ProviderUpdateDataPayments('mercadopago', {token:data.token})
  };

  const formMercadoPago = {
    register, 
    handleSubmit, 
    onSubmit,
    setValue
  }
  return {formMercadoPago}
}