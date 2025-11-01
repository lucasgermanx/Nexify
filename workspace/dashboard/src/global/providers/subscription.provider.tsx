import { SubscriptionContextType, SubscriptionResponse } from "@/@types/subscriptions.type";
import React, { useState } from "react";

import subscriptionsController from "@/controllers/subscriptions.controller";
import { toast } from "sonner";
import { useManageStore } from "../../core/client/hooks/select-store-zuustand";

export const SubscriptionContext = React.createContext<SubscriptionContextType | null>(null);

export const SubscriptionProvider = (props: any) => {
  const [url_invoice, setUrlInvoice] = useState<string | undefined>();
  const {store_reference} = useManageStore()
  
  const ProviderGetLastInvoice = async () => {
   try {
        if(!store_reference)
            return

        const response = await subscriptionsController.getLastInvoiceByStore(store_reference) as SubscriptionResponse
     
        if(response == undefined || response.failed == true){
            return toast.error("Não foi possível filtrar as categorias no momento. Tente novamente mais tarde!");
        }

        if(response.subscription == null){
            return setUrlInvoice(undefined)
        }
        
        setUrlInvoice(response.subscription.invoices[0].invoiceUrl)
   } catch (error) {
        console.log(error)
    }
  };

  React.useEffect(()=>{
    ProviderGetLastInvoice()
  },[store_reference])

  return (
    <SubscriptionContext.Provider value={{url_invoice, ProviderGetLastInvoice}}>
      {props.children}
    </SubscriptionContext.Provider>
  );
};
