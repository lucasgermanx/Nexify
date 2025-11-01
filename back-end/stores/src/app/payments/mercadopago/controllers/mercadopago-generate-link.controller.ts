import { Request, Response } from "express";
import { IMercadoPagoGenerateLink, MercadoPagoGenerateLinkService } from "../services/mercadopago-generate-link.service";

export const MercadoPagoGenerateLinkController = async (request: Request<{}, {}, IMercadoPagoGenerateLink>, response: Response) => {
    try {
        const contentBody = request.body
        const result = await MercadoPagoGenerateLinkService(contentBody)
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