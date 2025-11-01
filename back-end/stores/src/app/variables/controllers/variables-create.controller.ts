import { IVariablesCreate } from "@/interfaces/variables/variables-create.interface";
import { Request, Response } from "express";
import { VariablesCreateService } from "../services/variables-create.service";
import { VariableCreateValidator } from "../validators/variables-create.validator";

export const VariablesCreateController = async (request: Request<{}, {}, IVariablesCreate>, response: Response) => {
    try {
        const dataPayload = VariableCreateValidator.parse(request.body);
        const result = await VariablesCreateService(dataPayload)
        return response.status(result.status).json(result);
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            messsage: "Não foi possível prosseguir com a criação desse comando! Tente novamente mais tarde.",
            status: 500,
            failed: true
        })
    }
}