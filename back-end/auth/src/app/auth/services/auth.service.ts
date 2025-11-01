import { AuthConfig } from "@/config/auth.config";
import { ILogin } from "@/interfaces/auth.interface";
import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import authRepository from "../repositories/auth.repository";

const secretKey = new AuthConfig().jwtConfig.secretKey;
const algorithm = new AuthConfig().jwtConfig.algorithm;
const expiresIn = new AuthConfig().jwtConfig.expiresIn;

const signOptions: SignOptions = {
  algorithm: algorithm as jwt.Algorithm,
  expiresIn: expiresIn,
};

export const AuthService = async (dataPayload:ILogin) => {
    const getUserByEmail = await authRepository.findUserByEmail(dataPayload.email)

    if (!getUserByEmail || !(await bcrypt.compare(dataPayload.password, getUserByEmail.password))) {
        return { failed: true, status:401, message: "Verifique os dados informados! Os dados informados pertencem a outro usuário." };
    }

    if(getUserByEmail?.status != 'active'){
        return { failed: true, status:401, activated:false, message: "Para sua segurança, solicitamos que ative sua conta antes de continuar." };
    }

    delete getUserByEmail?.password;

    const token = jwt.sign(getUserByEmail, secretKey as Secret, signOptions);

    return { 
        failed: false, 
        message:"Usuário logado com sucesos", 
        status: 200, 
        token 
    };
}