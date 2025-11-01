import { IProductCreate } from "@/interfaces/products/products-create.interface";
import { defaultBase64 } from "@/utils/default-base-64.utils";
import { resizeBase64Image } from "@/utils/resize-base64.utils";
import { Request, Response } from "express";
import { ProductsCreateService } from "../services/products-create.service";

export const ProductsCreateController = async (request: Request<{}, {}, IProductCreate>, response: Response) => {
    try {
        const dataPayload = request.body;

        if (!request.files || !(request.files as Express.Multer.File[]).length) {
            const result = await ProductsCreateService({
                ...dataPayload,
                product_stock: parseInt(String(dataPayload.product_stock)),
                product_image: await resizeBase64Image(defaultBase64, 150, 150),
            })
            
            return response.status(result.status).json(result);
        }

        const files = request.files as Express.Multer.File[];
        const base64Images: string[] = files.map(file => file.buffer.toString('base64'));

        const result = await ProductsCreateService({
            ...dataPayload,
            product_stock: parseInt(String(dataPayload.product_stock)),
            product_image: await resizeBase64Image(base64Images[0], 150, 150),
        })
        return response.status(result.status).json(result);
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            messsage: "Não foi possível prosseguir com a criação desse produto! Tente novamente mais tarde.",
            status: 500,
            failed: true
        })
    }
}