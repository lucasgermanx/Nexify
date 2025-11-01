import { Request, Response } from "express";
import { IPicPayGenerateLink, PicPayGenerateLinkService } from "../services/picpay-generate-link.service";

export const PicPayGenerateLinkController = async (request: Request<{}, {}, IPicPayGenerateLink>, response: Response) => {
    try {
        const contentBody = request.body
        const result = await PicPayGenerateLinkService(contentBody)
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