import { IUpdatePlanStore } from "@/interfaces/store-update-plan.interface";
import { getValueByName } from "@/utils/get-plans.utils";
import asaasRepository from "../repositories/asaas.repository";
import storeRepository from "../repositories/store.repository";
import subscriptionRepository from "../repositories/subscription.repository";

export const StoreUpdatePlanService = async (dataPayload: IUpdatePlanStore) => {
    const findStore = await storeRepository.storeFindByReference(dataPayload.store_reference)

    if (!findStore) {
        return {
            failed: true,
            status: 404,
            message: "Lamentamos informar que não foi possível atualizar a loja, pois não foi encontrada nenhuma correspondência com os dados fornecidos.",
        };
    }

    if(dataPayload.store_plan == findStore.store_plan){
        return {
            failed: true,
            status: 401,
            message: "Não foi possível realizar essa atualização, a loja já possui este plano",
        };
    }

    const findSubscription = await subscriptionRepository.getSubscriptionByStoreReference(dataPayload.store_reference)

    if(!findSubscription){
        return {
            failed: true,
            status: 404,
            message: "Lamentamos informar que não foi possível cancelar a loja, pois não foi encontrada nenhuma correspondência com os dados fornecidos.",
        };
    }
    
    const updateSubscription = await asaasRepository.updateSubscription({
        id: findSubscription.subscription_id,
        value: String(getValueByName(dataPayload.store_plan)),
        description: `Assinatura do Plano ${dataPayload.store_plan} - FiveMarket`,
    })

    console.log(updateSubscription)

    if(!updateSubscription){
      return {
        failed: true,
        status: 401,
        message:
          "Lamentamos informar que não foi possível cancelar sua assinatura! Entre em contato com o suporte.",
      };
    }
    
    const updatedStore = await storeRepository.storeUpdate({
        store_reference: dataPayload.store_reference,
        store_domain: findStore.store_domain ?? null,
        store_subdomain: findStore.store_subdomain,
        store_name: findStore.store_name,
        maintenance: findStore.maintenance,
        store_plan: dataPayload.store_plan
    });

    if (!updatedStore) {
        return {
            failed: true,
            status: 500,
            message:
                "Não foi possível atualizar a loja devido á problemas internos. Tente novamente mais tarde.",
        };
    }

    return {
        failed: false,
        status: 200,
        message: "O plano foi atualizado com sucesso. Todas as alterações foram aplicadas com êxito."
    };
}