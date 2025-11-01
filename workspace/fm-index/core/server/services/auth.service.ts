import { IActivateAccount, ILogin, IRegisterAccount } from "../@types/auth.type";

class AuthService {
  public async Login(login: ILogin) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GATEWAY_URL}/auth/login`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...login }),
      }
    );
    
    return await response.json();
  }

  public async Register(registerPayload: IRegisterAccount) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GATEWAY_URL}/auth/register`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...registerPayload }),
      }
    );
    
    return await response.json();
  }

  public async ActivateAccount(activateAccountPayload: IActivateAccount) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GATEWAY_URL}/auth/activate/account/`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...activateAccountPayload }),
      }
    );

    return await response.json();
  }

  public async ResendActivateAccount(email:string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GATEWAY_URL}/auth/resend/activate/account/`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    return await response.json();
  }

  public async GetDataUser(token:string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GATEWAY_URL}/auth/user`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "authorization": token
        },
      }
    );

    return await response.json();
  }

  public async RecoverAccount(email:string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GATEWAY_URL}/auth/recover/password/account`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    return await response.json();
  }

  public async ConfirmRecoverToken(email:string, token:string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GATEWAY_URL}/auth/recover/password/confirm/token/`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token}),
      }
    );

    return await response.json();
  }

  public async ResetPassword(password:string, confirm_password:string, email:string, token:string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GATEWAY_URL}/auth/recover/password/reset`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({password, confirm_password, email, token}),
      }
    );

    return await response.json();
  }
}

export default new AuthService();
