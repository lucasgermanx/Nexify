import { IUpdatePlanStore } from "@/interfaces/store-update-plan.interface";
import { Request, Response } from "express";
import { StoreUpdatePlanService } from "../services/store-update-plan.service";
import { StorePlanUpdateValidator } from "../validators/store-update-plan.validator";

export const StoreUpdatePlanController = async (request: Request<{}, {}, IUpdatePlanStore>, response: Response) => {
    try {
        const dataPayload = StorePlanUpdateValidator.parse(request.body)
        const result = await StoreUpdatePlanService(dataPayload)
        return response.status(result.status).json(result)
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            messsage: "Não foi possível prosseguir com a criação da sua loja",
            status: 500,
            failed: true,
        })
    }
}