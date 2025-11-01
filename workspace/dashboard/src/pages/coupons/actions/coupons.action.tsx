import { useCoupon } from "@/core/client/providers/coupons/coupons.provider";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const CouponsActions = () => {
  const { register, watch } = useForm();
  const { coupons, paginationFilter, ProviderGetAllCoupons, ProviderFilterCupons, ProviderDeleteCoupon } = useCoupon();
  const [isFiltering, setFiltering] = useState(false);

  const handlePageChange = (pageNumber: string) => {
    if (!isFiltering) {
      ProviderGetAllCoupons(pageNumber);
    } else {
      ProviderFilterCupons(watch("value"), pageNumber);
    }
  };

  React.useEffect(() => {
    if (watch("value")?.length != 0) {
      setFiltering(true);
      ProviderFilterCupons(watch("value"), '1');
    } else {
      setFiltering(false);
      ProviderGetAllCoupons('1');
    }
  }, [watch("value")]);

  return { coupons, paginationFilter, register, ProviderDeleteCoupon, handlePageChange };
};
