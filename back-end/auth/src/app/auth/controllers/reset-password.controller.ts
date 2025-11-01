import { IPasswordRecovery } from "@/interfaces/recover-account.interface";
import { Request, Response } from "express";
import { ResetPasswordService } from "../services/reset-password.service";
import { ResetPasswordValidator } from "../validators/recover-account.validator";

export const ResetPasswordController = async (request: Request<{}, {}, IPasswordRecovery>, response:Response) => {
    try {
        const dataPayload = ResetPasswordValidator.parse(request.body);
        const result = await ResetPasswordService(dataPayload)
        return response.status(result.status).json(result)
    } catch (error) {
        console.log(error)
        return response.json({
            failed: true,
            error: "Não foi altar a senha da sua conta no momento. Se o problema persistir, entre em contato com o suporte.",
        });
    }
}