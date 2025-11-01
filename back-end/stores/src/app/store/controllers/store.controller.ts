import { IStore } from "@/interfaces/store-reference.interface";
import { Request, Response } from "express";
import { StoreService } from "../services/store.service";

export const StoreController = async (request: Request<IStore>, response: Response) => {
    try {
        const dataPayload = request.params
        const result = await StoreService(dataPayload)
        return response.status(result.status).json(result)
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            messsage: "Algo deu errado. Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.",
            status: 500,
            failed: true,
        })
    }
}