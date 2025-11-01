/* eslint-disable */
import { IResponseProvider, PropsProvider } from "@/core/@types/general.types";
import { useManageStore } from "@/core/client/hooks/select-store-zuustand";
import { createCoupon, deleteCoupon, filterCoupons, getAllCoupons, updateCoupon, updateStatusCoupon } from "@/core/server/services/coupons/coupons.service";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { CouponsContextType, ICoupon, ICouponsResponse, ICreateCoupon, IPagination, IUpdateCoupon } from "./coupons-provider.type";


export const CouponsContext = React.createContext<CouponsContextType>(
    {} as CouponsContextType
);

export const CouponProvider: React.FC<PropsProvider> = ({children}) => {
  const [coupons, setCoupons] = useState<ICoupon[] | []>()
  const [paginationFilter, setPaginationFilter] = useState<IPagination>()
  const { store_reference } = useManageStore()

  const ProviderGetAllCoupons = async (page: string) => {
    try {
      const response = await getAllCoupons({
        store_reference: store_reference,
        page: page ? parseInt(page) : 1,
        pageSize: 12
      }) as ICouponsResponse

      if (response == undefined || response.failed == true) {
        return toast.error("Não foi possível filtrar os cupons no momento. Tente novamente mais tarde!");
      }

      setCoupons(response.coupons)
      setPaginationFilter({
        paginationCount: response.paginationCount,
        hasMoreResults: response.hasMoreResults
      })
    } catch (error) {
      console.log(error)
    }
  }

  const ProviderFilterCupons = async (value: string, page: string) => {
    try {
      const response = await filterCoupons({
        store_reference: store_reference,
        page: page ? parseInt(page) : 1,
        pageSize: 12,
        value: value
      }) as ICouponsResponse

      if (response == undefined || response.failed == true) {
        return toast.error("Não foi possível filtrar os cupons no momento. Tente novamente mais tarde!");
      }

      setCoupons(response.coupons)
      setPaginationFilter({
        paginationCount: response.paginationCount,
        hasMoreResults: response.hasMoreResults
      })
    } catch (error) {
      console.log(error)
    }
  }

  const ProviderDeleteCoupon = async (coupon_reference: string) => {
    try {
      const response = await deleteCoupon(coupon_reference) as IResponseProvider
      if (response == undefined || response.failed == true) {
        return toast.error(response.message || "Não foi possível deletar o seu cupom! Tente novamente mais tarde");
      }

      ProviderGetAllCoupons('1')
      return toast.success(response.message);
    } catch (error) {
      return toast.error("Não foi possível deletar o seu cupom! Tente novamente mais tarde");
    }
  }

  const ProviderUpdateStatusCoupon = async (activated: boolean, coupon_reference: string) => {
    try {
      const response = await updateStatusCoupon({
        activated: activated,
        coupon_reference: coupon_reference,
        store_reference: store_reference
      }) as IResponseProvider

      if (response == undefined || response.failed == true) {
        return toast.error(response.message || "Não foi possível atualizar o seu cupom! Tente novamente mais tarde");
      }

      ProviderGetAllCoupons('1')
      return toast.success(response.message);
    } catch (error) {
      return toast.error("Não foi possível atualizar o seu cupom! Tente novamente mais tarde");
    }
  }

  const ProviderUpdateCoupon = async (updateData: IUpdateCoupon) => {
    try {
      const response = await updateCoupon({...updateData}) as IResponseProvider

      if (response == undefined || response.failed == true) {
        return toast.error(response.message || "Não foi possível atualizar o seu cupom! Tente novamente mais tarde");
      }

      ProviderGetAllCoupons('1')
      return toast.success(response.message);
    } catch (error) {
      return toast.error("Não foi possível atualizar o seu cupom! Tente novamente mais tarde");
    }
  }

  const ProviderCreateCoupon = async (dataPayload: ICreateCoupon) => {
    try {
      const response = await createCoupon({ store_reference: store_reference, ...dataPayload }) as IResponseProvider

      if (response == undefined || response.failed == true) {
        return toast.error(response.message || "Não foi possível criar o seu cupom! Tente novamente mais tarde");
      }

      ProviderGetAllCoupons('1')
      return toast.success(response.message);
    } catch (error) {
      return toast.error("Não foi possível criar o seu cupom! Tente novamente mais tarde");
    }
  }

  React.useEffect(() => {
    ProviderGetAllCoupons(store_reference)
  }, [store_reference])

  return (
    <CouponsContext.Provider value={{ coupons, paginationFilter, ProviderGetAllCoupons, ProviderFilterCupons, ProviderDeleteCoupon, ProviderUpdateStatusCoupon, ProviderUpdateCoupon, ProviderCreateCoupon }}>
      {children}
    </CouponsContext.Provider>
  );
};

export const useCoupon = () => useContext(CouponsContext);