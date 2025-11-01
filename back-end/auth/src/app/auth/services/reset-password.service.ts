import { AuthConfig } from "@/config/auth.config";
import { eventEmitter } from "@/config/events.config";
import { IPasswordRecovery } from "@/interfaces/recover-account.interface";
import bcrypt from "bcrypt";
import authRepository from "../repositories/auth.repository";

export const ResetPasswordService = async (dataPayload: IPasswordRecovery) => {
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
    

    if (!findRecoveryTokenAccount || findRecoveryTokenAccount.token_expired || !findRecoveryTokenAccount.token_used) {
        return {
            failed: true,
            status: 401,
            message:
                "Hmmm... Não foi possível realizar a alteração da sua senha. Tente novamente mais tarde!",
        };
    }

    if (dataPayload.password != dataPayload.confirm_password) {
        return {
            failed: true,
            status: 401,
            message:
                "Hmmm... Não foi possível realizar a alteração da sua senha. Tente novamente mais tarde!",
        };
    }

    const hash = bcrypt.hashSync(dataPayload.password, new AuthConfig().bcryptConfig.saltRounds);

    const updatePassword = await authRepository.updatePassword(
        dataPayload.email,
        hash
    );

    const expireToken = await authRepository.expireRecoveryToken(
        dataPayload.email,
        dataPayload.token
    );

    if (!updatePassword || !expireToken) {
        return {
            failed: true,
            status: 401,
            message:
                "Hmmm... Houve um problema ao alterar sua senha. Tente novamente mais tarde!",
        };
    }

    eventEmitter.emit("user:passwordChanged", { email: dataPayload.email });

    return {
        failed: false,
        status: 202,
        message: "Senha alterada com sucesso.",
    };
}