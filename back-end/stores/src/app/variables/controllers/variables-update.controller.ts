import { IVariableUpdate } from "@/interfaces/variables/variables-create.interface";
import { Request, Response } from "express";
import { VariablesUpdateService } from "../services/variables-update.service";
import { VariableUpdateValidator } from "../validators/variables-update.validator";

export const VariablesUpdateController = async (request: Request<{}, {}, IVariableUpdate>, response: Response) => {
    try {
        const dataPayload = VariableUpdateValidator.parse(request.body);
        const result = await VariablesUpdateService(dataPayload)
        return response.status(result.status).json(result);
    } catch (error) {
        return response.status(500).json({
            messsage: "Não foi possível atualizar sua variável! Tente novamente mais tarde.",
            status: 500,
            failed: true
        })
    }
}