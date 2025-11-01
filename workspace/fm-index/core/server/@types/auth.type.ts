export interface ILogin{
  email: string;
  password: string;
};

export interface IRegisterAccount{
  name: string;
  email: string;
  cpf:string;
  password: string;
};

export interface IActivateAccount{
  email: string;
  token: string;
};