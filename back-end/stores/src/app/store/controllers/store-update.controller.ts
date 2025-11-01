import { IUpdateStore } from "@/interfaces/store-update.interface";
import { Request, Response } from "express";
import { StoreUpdateService } from "../services/store-update.service";
import { StoreUpdateValidator } from "../validators/store-update.validator";

export const StoreUpdateController = async (request: Request<{}, {}, IUpdateStore>, response: Response) => {
    try {
        const dataPayload = StoreUpdateValidator.parse(request.body)
        const result = await StoreUpdateService(dataPayload)
        return response.status(result.status).json(result)
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            messsage: "Não foi possível prosseguir com a atualização da sua loja",
            status: 500,
            failed: true,
        })
    }
}