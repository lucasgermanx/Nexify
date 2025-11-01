import { CalculateTimeResendToken } from "@/app/utils/CalculateTimeResendToken";
import { generateRandomToken } from "@/app/utils/GenerateRandomToken";
import { eventEmitter } from "@/config/events.config";
import { IResentActivate } from "@/interfaces/activate-account.interface";
import authRepository from "../repositories/auth.repository";

const mensagemErro5Minutos =
    "Aguarde 5 minutos antes de solicitar um novo código.";
const mensagemErro10Minutos =
    "Aguarde 10 minutos antes de solicitar um novo código.";
const mensagemErro15Minutos =
    "Aguarde 15 minutos antes de solicitar um novo código (última tentativa).";


export const ResentActivateAccountService = async (dataPayload: IResentActivate) => {
    const getUserByEmail = await authRepository.findUserByEmail(dataPayload.email)

    if (!getUserByEmail) {
        return {
            failed: true,
            status: 401,
            message: "Hmmm... Não encontramos nenhuma conta associada a esses dados. Verifique se digitou tudo corretamente e tente novamente."
        };
    }

    const getToken = await authRepository.findTokenActivateAccountByEmail(dataPayload.email)

    if (!getToken || getToken.token_used || getToken.token_expired) {
        return {
            status: 401,
            failed: true,
            message:
                "O token de ativação informado é inválido. Por favor, verifique e tente novamente.",
        };
    }

    const codeGenerated = generateRandomToken();
    const tempoPassadoEmMinutos = CalculateTimeResendToken(`${getToken.updatedAt}`);

    if (tempoPassadoEmMinutos !== undefined) {
        const { times_resent } = getToken;
        switch (times_resent) {
            case 1:
                if (tempoPassadoEmMinutos <= 5) {
                    return { failed: true, status: 429, message: mensagemErro5Minutos };
                }
                break;
            case 2:
                if (tempoPassadoEmMinutos <= 10) {
                    return { failed: true, status: 429, message: mensagemErro10Minutos };
                }
                break;
            case 3:
                if (tempoPassadoEmMinutos <= 15) {
                    return { failed: true, status: 429, message: mensagemErro15Minutos };
                }
                break;
            case 4:
                if (tempoPassadoEmMinutos <= 25) {
                    await authRepository.expireToken(getToken.id)
                    return { failed: true, status: 401, message: "O token de ativação expirou." };
                }
                break;
        }
    }

    const updateToken = await authRepository.updateResentToken(
        getToken,
        codeGenerated
    );

    if (!updateToken) {
        return {
            failed: true,
            status: 500,
            message:
                "Ocorreu um erro ao reenviar o token de ativação. Por favor, tente novamente mais tarde.",
        };
    }

    eventEmitter.emit("user:create", {
        name: getUserByEmail.name,
        email: getUserByEmail.email,
        token: codeGenerated,
    });

    return {
        failed: false,
        status: 200,
        message: "Reenviamos o token para o seu e-mail. Por favor, verifique.",
    };
}