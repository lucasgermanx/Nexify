import { AuthConfig } from "@/config/auth.config";
import { Prisma } from "@/config/prisma.config";
import bcrypt from "bcrypt";
import { Response } from "express";
import { userUpdatePassword, RegisterResponse } from "../@types/user.type";
import userRepository from "./repositories/user.repository";

class UserUpdatePasswordService {
  async handler(response: Response, userPayload: userUpdatePassword):Promise<RegisterResponse>  {
    const findUser = await userRepository.findUser(userPayload.user_reference, userPayload.email)
   
    if(!findUser){
      return{
        status:200,
        failed: true,
        message: "O usuário informado não existe no base de dados."
      }
    }

    if(userPayload.password !== userPayload.confirm_password){
        return{
            status:200,
            failed: true,
            message: "As senhas informadas são incompatíveis"
        }
    }
    
    const hash = bcrypt.hashSync(userPayload.password,
        new AuthConfig().bcryptConfig.saltRounds
    );

    const updatedUser = await Prisma.users.update({
      where:{user_reference: userPayload.user_reference},
      data:{
        password: hash
      }
    })
    
    if(!updatedUser){
      return {
        failed: true,
        status: 200,
        message: "Os dados do usuário não foram atualizados. Tente novamente ou entre em contato com o suporte.",
      };
    }

    return {
      failed: false,
      status: 200,
      message: "Senha atualizada com sucesso.",
    };
  }
}

export default new UserUpdatePasswordService()