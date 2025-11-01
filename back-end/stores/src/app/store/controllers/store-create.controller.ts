import { IStoreCreate } from "@/interfaces/store-create.interface";
import { Request, Response } from "express";
import { StoreCreateService } from "../services/store-create.service";
import { StoreCreateValidator } from "../validators/store-create.validator";

export const StoreCreateController = async (request: Request<{}, {}, IStoreCreate>, response: Response) => {
    try {
        const dataPayload = StoreCreateValidator.parse(request.body)
        const result = await StoreCreateService(dataPayload)
        return response.status(result.status).json(result)
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            messsage: "Não foi possível prosseguir com a criação da sua loja",
            status: 500,
            failed: true,
        })
    }
}