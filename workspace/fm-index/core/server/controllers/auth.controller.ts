import { IActivateAccount, ILogin, IRegisterAccount } from "../@types/auth.type";
import AuthService from "../services/auth.service";

class AuthController {
  public async Login(login: ILogin){
    const loginUserService = await AuthService.Login(login);
    return loginUserService;
  }

  public async Register(registerPayload: IRegisterAccount){
    const loginUserService = await AuthService.Register(registerPayload);
    return loginUserService;
  }

  public async ActivateAccount(activateAccountPayload: IActivateAccount){
    const activateAccountService = await AuthService.ActivateAccount(activateAccountPayload);
    return activateAccountService;
  }

  public async ResendActivateAccount(email:string){
    const activateAccountService = await AuthService.ResendActivateAccount(email);
    return activateAccountService;
  }

  public async GetDataUser(token:string){
    const getDataUserService = await AuthService.GetDataUser(token);
    return getDataUserService;
  }

  public async recoverAccount(email:string){
    const recoverAccountService = await AuthService.RecoverAccount(email);
    return recoverAccountService;
  }

  public async confirmRecoverToken(email:string, token:string){
    const recoverAccountService = await AuthService.ConfirmRecoverToken(email, token);
    return recoverAccountService;
  }

  public async resetPassword(password:string, confirm_password:string, token: string, email:string){
    const recoverAccountService = await AuthService.ResetPassword(password, confirm_password, email, token);
    return recoverAccountService;
  }
}

export default new AuthController();
