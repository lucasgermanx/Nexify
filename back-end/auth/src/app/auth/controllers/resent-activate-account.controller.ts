import { IResentActivate } from "@/interfaces/activate-account.interface";
import { Request, Response } from "express";
import { ResentActivateAccountService } from "../services/resent-activate-account.service";
import { ResentActivateValidator } from "../validators/activate-accout.validator";

export const ResentActivateAccountController = async (request: Request<{}, {}, IResentActivate>, response:Response) => {
    try {
        const dataPayload = ResentActivateValidator.parse(request.body);
        const result = await ResentActivateAccountService(dataPayload)
        return response.status(result.status).json(result)
    } catch (error) {
        console.log(error)
        return response.json({
            failed: true,
            error: "Não foi possível reeenviar o token de ativação da sua conta no momento. Se o problema persistir, entre em contato com o suporte.",
        });
    }
}