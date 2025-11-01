export interface IRecover {
    email: string;
}


export interface ITokenRecoverAccount {
    token: string;
    email: string;
}


export interface IPasswordRecovery {
    email: string;
    token: string;
    password: string;
    confirm_password: string;
  }
  