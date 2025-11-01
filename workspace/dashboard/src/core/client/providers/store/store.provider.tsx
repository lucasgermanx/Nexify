import React, { useContext, useEffect, useState } from "react";

import { PropsProvider } from "@/core/@types/general.types";
import { useAuth } from "@/core/client/providers/auth/auth.provider";
import { cancelStore, getStoreData, getSubscriptionUser, updateDataPayments, updateStore, updateSubscriptionPlan } from "@/core/server/services/stores/store.service";
import { toast } from "sonner";
import { filterDefaultStore } from "../../../utils/filter-store.utils";
import { useManageStore } from "../../hooks/select-store-zuustand";
import { Store, StoreContextType, StoreResponse } from "./store-provider.types";

export const StoreContext = React.createContext<StoreContextType>(
  {} as StoreContextType
);

export const StoreProvider: React.FC<PropsProvider> = ({ children }) => {
  const [stores, setStores] = useState<Store[] | undefined>();
  const [store, setStore] = useState<Store | undefined>();
  const { store_reference, setStoreReference } = useManageStore()
  const { user } = useAuth();
  const [url_invoice, setUrlInvoice] = useState<string | undefined>();

  const ProviderGetStore = async () => {
    try {
      if (user == undefined) {
        return
      }
      const data = await getStoreData(user?.user_reference) as StoreResponse

      if (data.store?.length == 0) {
        return window.location.href = "https://fivemarket.com.br/checkout/plans";
      }

      if (data == undefined || data.failed == true) {
        toast.error(
          "Nao foi possivel processar seu cadastro no momento. Tente novamente mais tarde!"
        );
      }

      const defaultStore = store_reference

      if (!defaultStore) {
        if (data.store[0].store_reference) {
          setStoreReference(data.store[0].store_reference)
        }
      }

      const filterStore = filterDefaultStore(data.store, defaultStore as string)

      if (filterStore.length == 0) {
        if (data.store[0].store_reference) {
          setStoreReference(data.store[0].store_reference)
        }
      }

      setStores(data.store)
    } catch (error) {
      console.log(error);
    }
  };

  const ProviderGetSelectedStore = async (store_reference: string) => {
    const filteredStores = stores?.filter((item) => item.store_reference === store_reference);
    if (filteredStores && filteredStores.length > 0) {
      if (filteredStores[0].store_status == "cancelled") {
        return window.location.href = "https://fivemarket.com.br/checkout/plans";
      }
      setStore(filteredStores[0]);
    }
  }

  const ProviderStoreDomain = async (store: any) => {
    try {
      const response = await updateStore(store_reference, store)

      if (response == undefined || response.failed == true) {
        return toast.error(response?.message || "Não foi possível atualizar os dados da sua loja. Tente novamente mais tarde!");
      }

      ProviderGetStore()
      return toast.success(response.message);
    } catch (error: any) {
      return toast.error(error?.response?.data?.message || "Não foi possível prosseguir com essa operação");
    }
  }

  const ProviderUpdateDataPayments = async (type: string, tokens: any) => {
    try {
      const response = await updateDataPayments(store_reference, type, tokens)

      if (response == undefined || response.failed == true) {
        return toast.error(response?.message || "Não foi possível atualizar os dados da sua loja. Tente novamente mais tarde!");
      }

      ProviderGetStore()
      return toast.success(response.message);
    } catch (error: any) {
      return toast.error(error?.response?.data?.message || "Não foi possível prosseguir com essa operação");
    }
  }

  const ProviderCancelStore = async () => {
    try {
      const response = await cancelStore(store_reference)

      if (response == undefined || response.failed == true) {
        return toast.error(response?.message || "Não foi possível cancelar sua loja. Tente novamente mais tarde!");
      }

      ProviderGetStore()
      return toast.success(response.message);
    } catch (error: any) {
      return toast.error(error?.response?.data?.message || "Não foi possível prosseguir com essa operação");
    }
  }

  const ProviderSubscriptionStore = async (plan: string) => {
    try {
      const response = await updateSubscriptionPlan(store_reference, plan)

      if (response == undefined || response.failed == true) {
        return toast.error(response?.message || "Não foi possível cancelar sua loja. Tente novamente mais tarde!");
      }

      ProviderGetStore()
      return toast.success(response.message);
    } catch (error: any) {
      return toast.error(error?.response?.data?.message || "Não foi possível prosseguir com essa operação");
    }
  }


  const ProviderGetSubscriptionUser = async () => {
    try {
      if (!store_reference) return

      const response = await getSubscriptionUser(store_reference)

      if (response == undefined || response.failed == true) {
        return toast.error(response?.message || "Não foi possível recuperar a fatura do usuário. Tente novamente mais tarde!");
      }

      if (response.subscription && response.subscription.invoices.length != 0) {
        setUrlInvoice(response.subscription.invoices[0].invoiceUrl)
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    ProviderGetStore()
    ProviderGetSubscriptionUser()
  }, [user, store_reference]);

  return (
    <StoreContext.Provider
      value={{
        ProviderGetStore,
        ProviderGetSelectedStore,
        ProviderStoreDomain,
        ProviderUpdateDataPayments,
        ProviderCancelStore,
        stores,
        store,
        ProviderSubscriptionStore,
        url_invoice
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};


export const useStore = () => useContext(StoreContext);