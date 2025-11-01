import { Store, StoreContextType, StoreResponse } from "@/core/server/@types/store.type";
import React, { useEffect, useState } from "react";

import storesController from "@/core/server/controllers/stores.controller";
import { getAddressStore } from "@/global/utils/getAddressStore.utils";
import { toast } from "sonner";
import storeReference from "../utils/set-store-reference.utils";

export const StoreContext = React.createContext<StoreContextType | null>(null);

export const StoreProvider = (props: any) => {
    const [store, setStore] = useState<Store | undefined>();
    const { setStoreReference } = storeReference()

    const ProviderGetStore = async (address: string) => {
        if (!address) {
            return window.location.href = "/store-not-found"
        }

        const data = await storesController.getStore(address) as StoreResponse;

        if (data == undefined || data.failed == true) {
            window.location.href = "/store-not-found"
            toast.error("Não foi possível recuperar os dados da loja. Tente novamente mais tarde!");
        }

        if (data.store.length == 0) {
            if (window.location.pathname != "/store-not-found") {
                window.location.href = "/store-not-found";
            }
        }

        if (window.location.pathname != "/store-not-found") {
            if (data.store[0].store_status != 'activated' || data.store[0].maintenance) {
                window.location.href = "/store-not-found"
            }
        }

        setStore(data.store[0])
        setStoreReference(data?.store[0].store_reference)
    };

    useEffect(() => {
        ProviderGetStore(getAddressStore());
    }, []);

    return (
        <StoreContext.Provider value={{ ProviderGetStore, store }}>
            {props.children}
        </StoreContext.Provider>
    );
};
