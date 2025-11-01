import { IStoreCancel } from "@/interfaces/store-cancel.interface";
import { Request, Response } from "express";
import { StoreCancelService } from "../services/store-cancel.service";
import { StoreCancelValidator } from "../validators/store-cancel.validator";

export const StoreCancelController = async (request: Request<{}, {}, IStoreCancel>, response: Response) => {
    try {
        const dataPayload = StoreCancelValidator.parse(request.body)
        const result = await StoreCancelService(dataPayload)
        return response.status(result.status).json(result)
    } catch (error) {
        return response.status(500).json({
            messsage: "Não foi possível prosseguir com a criação da sua loja",
            status: 500,
            failed: true,
        })
    }
}