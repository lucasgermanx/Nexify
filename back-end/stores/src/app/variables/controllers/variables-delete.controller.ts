import { IVariablesDelete } from "@/interfaces/variables/variables-create.interface";
import { Request, Response } from "express";
import { VariablesDeleteService } from "../services/variables-delete.service";
import { VariableDeleteValidator } from "../validators/variables-delete.validator";

export const VariableDeleteController = async (request: Request<{}, {}, IVariablesDelete>, response: Response) => {
    try {
        const dataPayload = VariableDeleteValidator.parse(request.body);
        const result = await VariablesDeleteService(dataPayload)
        return response.status(result.status).json(result);
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            messsage: "Não foi possível deletar sua variável! Tente novamente mais tarde.",
            status: 500,
            failed: true
        })
    }
}