import { IMercadoPagoAddToken } from "@/interfaces/mercadopago/mercadopago.interface";
import { Request, Response } from "express";
import { MercadoPagoAddTokenService } from "../services/mercadopago-addtoken.service";
import { MercadoPagoAddTokenValidator } from "../validators/mercadopago-addtoken.validator";

export const MercadoPagoAddTokenController = async (request: Request<{}, {}, IMercadoPagoAddToken>, response: Response) => {
    try {
        const contentBody = MercadoPagoAddTokenValidator.parse(request.body);
        const result = await MercadoPagoAddTokenService(contentBody)
        return response.status(result.status).json(result);
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            messsage: "Não foi possível prosseguir com a atualização desse token! Tente novamente mais tarde.",
            status: 500,
            failed: true
        })
    }
}