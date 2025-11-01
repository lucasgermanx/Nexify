import { Request, Response } from "express";
import { MercadoPagoCallbackService } from "../services/mercadopago-callback.service";

export const MercadoPagoCallbackController = async (request: Request, response: Response) => {
    try {
       const {store_reference} = request.params
       await MercadoPagoCallbackService(request.body, store_reference)
       return response.status(200)
    } catch (error) {
        return response.status(500).json({
            messsage: "Não foi possível prosseguir com a atualização desse token! Tente novamente mais tarde.",
            status: 500,
            failed: true
        })
    }
}