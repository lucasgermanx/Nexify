import { IProductUpdate } from "@/interfaces/products/products-update.interface";
import { defaultBase64 } from "@/utils/default-base-64.utils";
import { resizeBase64Image } from "@/utils/resize-base64.utils";
import { Request, Response } from "express";
import { ProductsUpdateService } from "../services/products-update.service";

export const ProductsUpdateController = async (request: Request<{}, {}, IProductUpdate>, response: Response) => {
    try {
        const dataPayload = request.body;

        if (!request.files || !(request.files as Express.Multer.File[]).length) {
            const result = await ProductsUpdateService({
                ...dataPayload,
                product_stock: parseInt(String(dataPayload.product_stock)),
                product_image: await resizeBase64Image(defaultBase64, 150, 150),
            })
            return response.status(result.status).json(result);
        }

        const files = request.files as Express.Multer.File[];
        const base64Images: string[] = files.map(file => file.buffer.toString('base64'));

        const result = await ProductsUpdateService({
            ...dataPayload,
            product_stock: parseInt(String(dataPayload.product_stock)),
            product_image: await resizeBase64Image(base64Images[0], 150, 150),
        })
        return response.status(result.status).json(result);
    } catch (error) {
        return response.status(500).json({
            messsage: "Não foi possível prosseguir com a atualização desse produto! Tente novamente mais tarde.",
            status: 500,
            failed: true
        })
    }
}