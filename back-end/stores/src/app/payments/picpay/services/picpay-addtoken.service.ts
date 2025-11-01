import storeRepository from "@/app/store/repositories/store.repository";
import { IPicPayAddToken } from "@/interfaces/picpay/picpay-addtoken.interface";
import { tokenVerify } from "@/utils/token-verify.utils";
import picpayRepository from "../repositories/picpay.repository";

export const PicPayAddTokenService = async (dataPayload: IPicPayAddToken) => {
    if (tokenVerify(dataPayload.picpayToken, 'TEST') || tokenVerify(dataPayload.sellerToken, 'TEST')) {
        return {
            failed: true,
            status: 401,
            message: "O token informado não é valido! Tente novamente com um token valido.",
        };
    }

    const findStore = await storeRepository.storeFindByReference(dataPayload.store_reference)

    if (!findStore) {
        return {
            failed: true,
            status: 401,
            message: "Lamentamos informar que não foi possível atualizar a loja, pois não foi encontrada nenhuma correspondência com os dados fornecidos.",
        };
    }

    const updateTokenPayment = await picpayRepository.updateToken(dataPayload.store_reference, dataPayload.picpayToken, dataPayload.sellerToken)

    if (!updateTokenPayment) {
        return {
            failed: true,
            status: 200,
            message:"Lamentamos informar que não foi possível atualizar a loja, pois não foi encontrada nenhuma correspondência com os dados fornecidos.",};
    }

    return {
        failed: false,
        status: 200,
        message: "A loja foi atualizada com sucesso. Todas as alterações foram aplicadas com êxito."
    };
}   