import { eventEmitter } from "@/config/events.config";
import { IActivate } from "@/interfaces/activate-account.interface";
import authRepository from "../repositories/auth.repository";

export const ActivateAccountService = async (dataPayload: IActivate) => {
    const getUserByEmail = await authRepository.findUserByEmail(dataPayload.email)

    if (!getUserByEmail) {
        return {
            failed: true,
            status: 401,
            message: "Verifique os dados informados! Os dados informados pertencem a outro usuário."
        };
    }

    const getToken = await authRepository.findTokenActivateAccount(dataPayload.email, dataPayload.token)

    if (!getToken || getToken.token_used || getToken.token_expired) {
        return {
            status: 401,
            failed: true,
            message:
                "O token de ativação informado é inválido. Por favor, verifique e tente novamente.",
        };
    }

    const activateAccount = await authRepository.activateAccount(dataPayload.email);

    if (!activateAccount) {
        return {
            status: 500,
            failed: true,
            message:
                "Ocorreu um erro ao ativar a conta. Por favor, tente novamente mais tarde.",
        };
    }

    const usageToken = await authRepository.updateToken(dataPayload.email, dataPayload.token)

    if (!usageToken) {
        return {
            status: 500,
            failed: true,
            message:
                "Ocorreu um erro ao processar o token de ativação. Por favor, tente novamente.",
        };
    }

    eventEmitter.emit("user:activated", { email: dataPayload.email });

    return {
        failed: false,
        status: 200,
        message: "Conta ativada com sucesso. Obrigado por se cadastrar em nossa plataforma!",
    };
}