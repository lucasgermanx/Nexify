import { ILogin } from "@/interfaces/auth.interface";
import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { LoginValidator } from "../validators/auth.validator";

export const AuthController = async (request: Request<{}, {}, ILogin>, response:Response) => {
    try {
        const dataPayload = LoginValidator.parse(request.body)
        const result = await AuthService(dataPayload)
        return response.status(result.status).json(result)
    } catch (error) {
        console.log(error)
        return response.json({
            failed: true,
            error: "Ocorreu um erro ao tentar acessar o sistema. Tente novamente mais tarde.",
        });
    }
}