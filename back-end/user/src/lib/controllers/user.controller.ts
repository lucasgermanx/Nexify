import { NextFunction, Request, Response } from "express";

import userService from "../services/user.service";

class UserController {
  public async GetUserByReference(request: Request, response: Response, next: NextFunction){
    try {
      const {user_reference} = await request.params
      const getUserByReference = await userService.GetUserByReference(user_reference);
      return response.status(getUserByReference.status).json(getUserByReference);      
    } catch (error: any) {
      return response.status(500).json({
        messsage:"Não foi possível prosseguir com essa operação! Tente novamente mais tarde ou entre em contato com o suporte.",
        status:500,
        failed:true
      })
    }
  }
}

export default new UserController();
