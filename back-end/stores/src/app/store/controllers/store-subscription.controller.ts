import { Request, Response } from "express";
import { StoreSubscription } from "../services/store-subscription.service";

export const StoreSubscriptionUser = async (request: Request, response: Response) => {
    try {
        const { store_reference } = request.params

        if (!store_reference) {
            return response.status(491).json({
                messsage: "Verifique os parametros informado.",
                status: 491,
                failed: true,
            })
        }

        const result = await StoreSubscription(store_reference)
        return response.status(result.status).json(result)
    } catch (error) {
        return response.status(500).json({
            messsage: "Algo deu errado. Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.",
            status: 500,
            failed: true,
        })
    }
}