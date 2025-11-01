import { useCoupon } from "@/core/client/providers/coupons/coupons.provider";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const CouponModalUpdateAction = () => {
  const [showModalUpdateCoupon, setShowModalUpdateCoupon] = useState(false);

  const showModalUpdateAction = () => {
    setShowModalUpdateCoupon(true);
  };

  const closeModalUpdateAction = () => {
    setShowModalUpdateCoupon(false);
  };

  const options = [
    { label: "Porcentagem", value: "percentage" },
    { label: "Direto no preço", value: "direct" },
  ];

  const optionsStatus = [
    { label: "Ativado", value: true },
    { label: "Desativado", value: false },
  ];

  return {
    showModalUpdateAction,
    closeModalUpdateAction,
    showModalUpdateCoupon,
    options,
    optionsStatus,
  };
};

export const CouponUpdateAction = () => {
  const { register, handleSubmit, setValue, reset} = useForm();
  const { ProviderUpdateCoupon } = useCoupon();

  const onSubmit = (data: any) => {
    ProviderUpdateCoupon(data);
    reset()
  };

  const form = {
    register,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
  };

  return { form };
};
