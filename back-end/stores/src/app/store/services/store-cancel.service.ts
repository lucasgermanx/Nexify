import { IStoreCancel } from "@/interfaces/store-cancel.interface";
import asaasRepository from "../repositories/asaas.repository";
import storeRepository from "../repositories/store.repository";
import subscriptionRepository from "../repositories/subscription.repository";

export const StoreCancelService = async (dataPayload: IStoreCancel) => {
    const findStore = await storeRepository.storeFindByReference(dataPayload.store_reference)

    if (!findStore) {
        return {
            failed: true,
            status: 404,
            message: "Lamentamos informar que não foi possível atualizar a loja, pois não foi encontrada nenhuma correspondência com os dados fornecidos.",
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
    
    const cancelSubscription = await asaasRepository.cancelSubscription(findSubscription.subscription_id)

    if(!cancelSubscription){
      return {
        failed: true,
        status: 401,
        message:
          "Lamentamos informar que não foi possível cancelar sua assinatura! Entre em contato com o suporte.",
      };
    }

    const updateDatabaseSubcription = await subscriptionRepository.cancel(findSubscription.subscription_id)

    if(!updateDatabaseSubcription){
        return {
          failed: true,
          status: 401,
          message:
            "Lamentamos informar que não foi possível salvar o cancelamento da sua assinatura! Entre em contato com o suporte.",
        };
      }

    const canceledStore = await storeRepository.storeUpdateStatus(dataPayload.store_reference, "cancelled")
    if (!canceledStore) {
        return {
            failed: true,
            status: 500,
            message: "Infelizmente, não foi possível concluir o cancelamento da loja devido a uma inconsistência detectada. Por favor, verifique os dados fornecidos e tente novamente.",
        };
    }

    return {
        failed: false,
        status: 200,
        message: "A loja foi cancelada com sucesso.",
    }
}