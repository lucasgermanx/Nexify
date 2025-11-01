import { NextFunction, Request, Response } from "express";

import updateUserService from "../services/update-user.service";
import { UserValidator } from "../validators/user.validator";

class UserUpdateController {
  public async Update(request: Request, response: Response, next: NextFunction){
    try {
      const data = await UserValidator.validate(
        request.body
      );

      const userUpdateResult = await updateUserService.handler(data);

      return response.status(userUpdateResult.status).json(userUpdateResult);
    } catch (error: any) {
      return response.status(500).json({
        messsage:"Não foi possível prosseguir com essa operação! Tente novamente mais tarde ou entre em contato com o suporte.",
        status:500,
        failed:true
      })
    }
  }
}

export default new UserUpdateController();
