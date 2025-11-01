import { NextFunction, Request, Response } from "express";

import updatePasswordService from "../services/update-password.service";
import { UserPasswordValidator } from "../validators/user.validator";

class UserUpdatePasswordController {
  public async UpdatePassword(request: Request, response: Response, next: NextFunction){
    try {
      const data = await UserPasswordValidator.validate(
        request.body
      );

      const userUpdateResult = await updatePasswordService.handler(response, data);

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

export default new UserUpdatePasswordController();
