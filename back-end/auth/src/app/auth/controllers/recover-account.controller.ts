import { IRecover } from "@/interfaces/recover-account.interface";
import { Request, Response } from "express";
import { RecoverAccountService } from "../services/recover-account.service";
import { RecoverValidator } from "../validators/recover-account.validator";

export const RecoverAccountController = async (request: Request<{}, {}, IRecover>, response:Response) => {
    try {
        const dataPayload = RecoverValidator.parse(request.body)
        const result = await RecoverAccountService(dataPayload)
        return response.status(result.status).json(result)
    } catch (error) {
        return response.json({
            failed: true,
            error: "Não foi possível gerar o token de recuperação neste momento. Por favor, tente novamente mais tarde ou entre em contato com o suporte.",
        });
    }
}