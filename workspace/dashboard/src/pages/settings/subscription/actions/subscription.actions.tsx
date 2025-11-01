import { useStore } from "@/core/client/providers/store/store.provider";

export const SubscriptionActions = () => {
    const { ProviderSubscriptionStore, url_invoice } = useStore()
    
    const handlerPlan = (plan: string) => {
        ProviderSubscriptionStore(plan)
    }

    return { handlerPlan, url_invoice}
}