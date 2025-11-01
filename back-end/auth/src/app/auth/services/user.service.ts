import { AuthConfig } from "@/config/auth.config";
import jwt, { Secret } from "jsonwebtoken";
import authRepository from "../repositories/auth.repository";

const secretKey = new AuthConfig().jwtConfig.secretKey;

export const getUser = async (token:string) => {
    const decodedToken = jwt.verify(token, secretKey as Secret) as any;

    const getUserByID = await authRepository.findUserByEmail(decodedToken.email)

    delete getUserByID?.password;
    
    return { failed: false, user: getUserByID };
}