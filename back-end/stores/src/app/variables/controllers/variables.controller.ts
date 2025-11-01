import { Request, Response } from "express";
import { VariablesService } from "../services/variables.service";

export const VariablesController = async (request: Request, response: Response) => {
    try {
        const { store_reference } = request.params
     
        const page = parseInt(request.query.page as string) || 1;
        const size = parseInt(request.query.size as string) || 1;
        
        const filter = request.query.filter as string

        if(filter){
            const result = await VariablesService({store_reference, page: String(page), pageSize: String(size), filter})
            return response.status(result.status).json(result);
        }else{
            const result = await VariablesService({store_reference, page: String(page), pageSize: String(size)})
            return response.status(result.status).json(result);
        }
    } catch (error) {
        return response.status(500).json({
            messsage: "Não foi possível prosseguir com essa solicitação! Tente novamente mais tarde.",
            status: 500,
            failed: true
        })
    }
}