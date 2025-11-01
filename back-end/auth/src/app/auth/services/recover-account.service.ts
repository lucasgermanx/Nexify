import { generateRandomToken } from "@/app/utils/GenerateRandomToken";
import { eventEmitter } from "@/config/events.config";
import { IRecover } from "@/interfaces/recover-account.interface";
import authRepository from "../repositories/auth.repository";

export const RecoverAccountService = async (dataPayload: IRecover) => {
    const getUserByEmail = await authRepository.findUserByEmail(dataPayload.email)

    if (getUserByEmail == null) {
        return {
            status: 404,
            failed: true,
            message:
                "Hmmm... Não encontramos nenhuma conta com esse e-mail. Verifique se digitou tudo certo e tente novamente.",
        };
    }

    const findTokenByEmail = await authRepository.findRecoveryTokenAccount(dataPayload.email)

    if (findTokenByEmail) {
        return {
            failed: true,
            status: 504,
            message:
                "Hmmm... Não foi possível realizar o reenvio do token de ativação. Tente novamente mais tarde!",
        };
    }

    const token = generateRandomToken();

    const createdToken = await authRepository.createToken(
        getUserByEmail,
        token
    );

    if (!createdToken) {
        return {
            failed: true,
            status: 301,
            message:
                "Se o e-mail inserido estiver associado a uma conta, enviaremos um e-mail!",
        };
    }

    eventEmitter.emit("user:generateRecoverToken", { email: getUserByEmail.email, token });

    return {
        failed: false,
        status: 202,
        message:
            "Se o e-mail inserido estiver associado a uma conta, enviaremos um e-mail!",
    };
}