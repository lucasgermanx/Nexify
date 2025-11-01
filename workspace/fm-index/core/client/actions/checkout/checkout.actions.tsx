import { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { FormHandler } from "../../handlers/FormHandler";
import { useAuth } from "../../providers/auth.provider";
import { useStore } from "../../providers/store.provider";
import { CheckoutStoreValidator } from "../../validators/checkout-store.validator";

interface createStoreInterface{
  store:string,
  store_money_type:string,
  subdomain:string,
}

export const CheckoutCreateStoreAction = () => {
  const {ProviderCheckAvailabilityStore, ProviderStoreCreate} = useStore()
  const {user} = useAuth()
  const [dataForm, setDataForm] = useState<createStoreInterface>();

  const { CheckoutStoreValidators, getErrorByType } = CheckoutStoreValidator();
  const { addForm } = FormHandler(CheckoutStoreValidators, setDataForm);

  const HandlerCreateStore = async () => {
    if(!dataForm)
      return

    ProviderStoreCreate({
      ...dataForm,
      user_reference: user.user_reference, 
      customer_reference: user.customer_id, 
      store_plan:String(secureLocalStorage.getItem("selected_plan"))
    })
  };

  const CheckAvailability = async () => {
    if(!dataForm)
      return
    ProviderCheckAvailabilityStore(dataForm.subdomain)
  }

  return { addForm, dataForm, getErrorByType, HandlerCreateStore, CheckAvailability };
};
