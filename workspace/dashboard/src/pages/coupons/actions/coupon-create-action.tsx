import { useCoupon } from "@/core/client/providers/coupons/coupons.provider";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const CreateCouponAction = () => {
  const { register, handleSubmit, setValue, reset} = useForm();
  const { ProviderCreateCoupon } = useCoupon();

  const onSubmit = (data: any) => {
    ProviderCreateCoupon(data)
    reset()
  };

  const form = {
    register,
    handleSubmit: handleSubmit(onSubmit),
    setValue
  }

  return { form }
}

export const ModalCreateCouponAction = () => {
  const [showModalCoupon, setShowModalCoupon] = useState(false);

  const showModalAction = () => {
    setShowModalCoupon(true);
  };

  const closeModalAction = () => {
    setShowModalCoupon(false);
  };

  const options = [
    { label: "Porcentagem", value: "percentage" },
    { label: "Direto no preço", value: "direct" }
  ];

  return { showModalAction, closeModalAction, showModalCoupon, options }
}