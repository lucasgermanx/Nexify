import { ITokenRecoverAccount } from "@/interfaces/recover-account.interface";
import { Request, Response } from "express";
import { ConfirmTokenResetPasswordService } from "../services/confirm-token-reset-password.service";
import { TokenValidator } from "../validators/recover-account.validator";

export const ConfirmTokenResetPasswordController = async (request: Request<{}, {}, ITokenRecoverAccount>, response: Response) => {
    try {
        const dataPayload = TokenValidator.parse(request.body)
        const result = await ConfirmTokenResetPasswordService(dataPayload)
        return response.status(result.status).json(result)
    } catch (error) {
        return response.json({
            failed: true,
            error: "Não foi possível realizar a confirmação do seu token. Por favor, tente novamente mais tarde ou entre em contato com o suporte.",
        });
    }
}