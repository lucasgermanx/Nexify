import { IStoreCreate } from "@/interfaces/store-create.interface";
import { getFutureDate } from "@/utils/get-future-date.utils";
import { getValueByName } from "@/utils/get-plans.utils";
import { storeReferenceUtils } from "@/utils/store-reference.utils";
import asaasRepository from "../repositories/asaas.repository";
import storeRepository from "../repositories/store.repository";
import subscriptionRepository from "../repositories/subscription.repository";

export const StoreCreateService = async (dataPayload: IStoreCreate) => {
    const findStore = await storeRepository.findStoreBySubdomain(dataPayload.store_subdomain+'.fivemarket.com.br')

    if (findStore) {
        return {
            failed: true,
            status: 401,
            message: "O subdomínio especificado já está associado a outra loja, portanto, não pode ser utilizado.",
        };
    }

    const reference = storeReferenceUtils();

    const createSubscription = await asaasRepository.createNewSubscription({
        customer: dataPayload.customer_reference ?? "",
        nextDueDate: getFutureDate(7),
        value: String(getValueByName(dataPayload.store_plan)),
        cycle: "MONTHLY",
        description: `Assinatura do Plano ${dataPayload.store_plan} - FiveMarket`,
        externalReference: reference
    })

    if (!createSubscription) {
        return {
            status: 500,
            failed: true,
            message: "Ops! Parece que não foi possível criar a assinatura. Entre em contato com o suporte.",
        }
    }

    const saveSubscription = await subscriptionRepository.saveSubscription(createSubscription)

    if (!saveSubscription) {
        return {
            status: 500,
            failed: true,
            message: "Ops! Parece que não foi possível salvar a assinatura. Entre em contato com o suporte.",
        }
    }

    const { customer_reference, ...newData } = dataPayload

    const createdStore = await storeRepository.createStore({...newData, due_date:getFutureDate(7)}, reference)
    if (!createdStore) {
        return {
            failed: true,
            status: 500,
            message: "Infelizmente, não foi possível concluir a criação da loja devido a uma inconsistência detectada. Por favor, verifique os dados fornecidos e tente novamente.",
        };
    }

    return {
        failed: false,
        status: 200,
        message: "A loja foi criada com sucesso. Parabéns e bem-vindo à nossa plataforma!",
    }
}