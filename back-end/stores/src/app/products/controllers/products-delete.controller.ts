import { IProductDelete } from "@/interfaces/products/products-delete.interface";
import { Request, Response } from "express";
import { ProductsDeleteService } from "../services/products-delete.service";
import { ProductsDeleteValidator } from "../validators/products-delete.validator";

export const ProductsDeleteController = async (request: Request<{}, {}, IProductDelete>, response: Response) => {
    try {
        const dataPayload = ProductsDeleteValidator.parse(request.body);
        const result = await ProductsDeleteService(dataPayload)
        return response.status(result.status).json(result);
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            messsage: "Não foi possível deletar esse produto! Tente novamente mais tarde.",
            status: 500,
            failed: true
        })
    }
}