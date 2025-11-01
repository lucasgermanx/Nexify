import { Prisma } from "@/config/prisma.config"
import { RegisterResponse, userUpdate } from "../@types/user.type"
import userRepository from "./repositories/user.repository"

class UserUpdateService {
  async handler(userPayload: userUpdate):Promise<RegisterResponse>  {
    const findUser = await userRepository.findUser(userPayload.user_reference, userPayload.email)

    if(!findUser){
      return{
        status:200,
        failed: true,
        message: "Não foi possível prosseguir com a atualização do seu usuário! Tente novamente ou entre em contato com o suporte."
      }
    }


    const findDiscord = await userRepository.findDiscordId(userPayload.user_discord)

    if(findDiscord){
      if(findDiscord?.user_reference != userPayload.user_reference){
        return{
          status:200,
          failed: true,
          message: "Não foi possível prosseguir com a atualização do seu usuário! Tente novamente ou entre em contato com o suporte."
        }
      }
    }

    const updatedUser = await Prisma.users.update({
      where:{user_reference: userPayload.user_reference},
      data:{
        ...userPayload
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
      message: "Usuário atualizado com sucesso.",
    };
  }
}

export default new UserUpdateService()