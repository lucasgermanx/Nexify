import { IUpdateStore } from "@/interfaces/store-update.interface";
import storeRepository from "../repositories/store.repository";

export const StoreUpdateService = async (dataPayload: IUpdateStore) => {
    const findStore = await storeRepository.storeFindByReference(dataPayload.store_reference)

    if (!findStore) {
        return {
            failed: true,
            status: 404,
            message: "Lamentamos informar que não foi possível atualizar a loja, pois não foi encontrada nenhuma correspondência com os dados fornecidos.",
        };
    }

    if (dataPayload.store_domain) {
        const storeWithSameDomain = await storeRepository.storeWithSameDomain(
            dataPayload.store_reference,
            dataPayload.store_domain
        );

        if (
            storeWithSameDomain &&
            storeWithSameDomain.store_reference !== dataPayload.store_reference
        ) {
            return {
                failed: true,
                status: 401,
                message:
                    "Não foi possível atualizar a loja devido à existência de uma outra loja já registrada com o mesmo domínio.",
            };
        }
    }


    if (dataPayload.store_subdomain) {
        const storeWithSameSubdomain = await storeRepository.storeWithSameSubdomain(
            dataPayload.store_subdomain,
            dataPayload.store_subdomain
        );

        if (
            storeWithSameSubdomain &&
            storeWithSameSubdomain.store_reference !== dataPayload.store_reference
        ) {
            return {
                failed: true,
                status: 401,
                message:
                    "Não foi possível atualizar a loja devido à existência de uma outra loja já registrada com o mesmo subdomínio.",
            };
        }
    }

    const updatedStore = await storeRepository.storeUpdate({
        store_reference: dataPayload.store_reference,
        store_domain: findStore.store_plan == "Enterprise" ? dataPayload.store_domain ?? null : null,
        store_subdomain: dataPayload.store_subdomain,
        store_name: dataPayload.store_name,
        maintenance: dataPayload.maintenance ? dataPayload.maintenance : false,
        store_plan: findStore.store_plan ?? null
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
        message: "A loja foi atualizada com sucesso. Todas as alterações foram aplicadas com êxito."
    };
}