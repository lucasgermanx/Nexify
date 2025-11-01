import { IActivate } from "@/interfaces/activate-account.interface";
import { Request, Response } from "express";
import { ActivateAccountService } from "../services/activate-account.service";
import { ActivateValidator } from "../validators/activate-accout.validator";

export const ActivateAccountController = async (request: Request<{}, {}, IActivate>, response:Response) => {
    try {
        const dataPayload = ActivateValidator.parse(request.body);
        const result = await ActivateAccountService(dataPayload)
        return response.status(result.status).json(result)
    } catch (error) {
        return response.json({
            failed: true,
            error: "Não foi possível ativar sua conta no momento. Se o problema persistir, entre em contato com o suporte.",
        });
    }
}