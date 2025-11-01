import { IRegister } from "@/interfaces/register-account.interface";
import { Request, Response } from "express";
import { RegisterAccountService } from "../services/register-account.service";
import { RegisterValidator } from "../validators/register-account.validator";

export const RegisterAccountController = async (request: Request<{}, {}, IRegister>, response:Response) => {
    try {
        const dataPayload = RegisterValidator.parse(request.body)
        const result = await RegisterAccountService(dataPayload)
        return response.status(result.status).json(result)
    } catch (error) {
        console.log(error)
        return response.json({
            failed: true,
            error: "Ocorreu um erro ao tentar acessar o sistema. Tente novamente mais tarde.",
        });
    }
}