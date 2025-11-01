import { eventEmitter } from "@/config/events.config";
import { ITokenRecoverAccount } from "@/interfaces/recover-account.interface";
import authRepository from "../repositories/auth.repository";

export const ConfirmTokenResetPasswordService = async (dataPayload: ITokenRecoverAccount) => {
    const getUserByEmail = await authRepository.findUserByEmail(dataPayload.email)

    if (getUserByEmail == null) {
        return {
            status: 404,
            failed: true,
            message:
                "Hmmm... Não encontramos nenhuma conta com esse e-mail. Verifique se digitou tudo certo e tente novamente.",
        };
    }

    const findRecoveryTokenAccount = await authRepository.findRecoveryTokenAccount(dataPayload.email)

    if (
        findRecoveryTokenAccount?.id == undefined ||
        findRecoveryTokenAccount?.token_expired == true ||
        findRecoveryTokenAccount.token_used == true
    ) {
        return {
            status: 401,
            failed: true,
            message:
                "Hmmm... Não encontramos nenhuma conta com esse e-mail. Verifique se digitou tudo certo e tente novamente.",
        };
    }

    const updateTokenUsageStatus = await authRepository.updateRecoveryAccontTokenToUsed(dataPayload.token);

    if (!updateTokenUsageStatus) {
        return {
            status: 401,
            failed: true,
            message:
                "Hmmm... Não encontramos nenhuma conta com esse e-mail. Verifique se digitou tudo certo e tente novamente.",
        };
    }

    eventEmitter.emit("user:recovered", { email: dataPayload.email });

    return {
        failed: false,
        status: 202,
        message: "Token ativado com sucesso.",
    };
}