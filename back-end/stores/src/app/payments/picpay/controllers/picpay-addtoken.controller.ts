import { IMercadoPagoAddToken } from "@/interfaces/mercadopago/mercadopago.interface";
import { Request, Response } from "express";
import { PicPayAddTokenService } from "../services/picpay-addtoken.service";
import { PicPayAddTokenValidator } from "../validators/picpay-addtoken.validator";

export const PicPayAddTokenController = async (request: Request<{}, {}, IMercadoPagoAddToken>, response: Response) => {
    try {
        const contentBody = PicPayAddTokenValidator.parse(request.body);
        const result = await PicPayAddTokenService(contentBody)
        return response.status(result.status).json(result);
    } catch (error) {
        return response.status(500).json({
            messsage: "Não foi possível prosseguir com a atualização desse token! Tente novamente mais tarde.",
            status: 500,
            failed: true
        })
    }
}