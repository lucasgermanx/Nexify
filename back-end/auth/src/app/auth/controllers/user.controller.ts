import { IUser } from "@/interfaces/user.interface";
import { Request, Response } from "express";
import { getUser } from "../services/user.service";

export const UserController = async (request: Request<{}, {}, IUser>, response:Response) => {
    try {
        const token = request.headers["authorization"];

        if(!token){
            return response.json({
                failed:true,
                message:"Verifique se o token do usuário está sendo informado"
            })
        }

        const result = await getUser(token)
        return response.json(result)
    } catch (error) {
        return response.json({
            failed: true,
            error: "Ocorreu um erro ao tentar processar sua requisição. Tente novamente mais tarde.",
        });
    }
}