import { Prisma } from "@/config/prisma.config";
import { IRegister } from "@/interfaces/register-account.interface";

class AuthRepository {
  public async findUserByEmail(email: string) {
    return await Prisma.users.findUnique({
      where: { email: email },
    });
  }

  public async createAccount(
    user_reference: string,
    customer_id: string,
    dataPayload: IRegister,
    token: string
  ) {
    return await Prisma.users.create({
      data: {
        user_reference: user_reference,
        customer_id: customer_id,
        ...dataPayload,
        activationTokens: {
          create: [
            {
              token: token,
              email: dataPayload.email,
            },
          ],
        },
      },
      include: {
        activationTokens: true,
      },
    });
  }

  public async findTokenActivateAccount(email: string, token: string) {
    return await Prisma.accountActivationToken.findUnique({
      where: {
        email: email,
        token: token,
      },
    });
  }

  public async findTokenActivateAccountByEmail(email: string) {
    return await Prisma.accountActivationToken.findFirst({
      where: {
        email: email,
      },
    });
  }

  public async activateAccount(email: string) {
    return await Prisma.users.update({
      where: {
        email: email,
      },
      data: {
        status: "active",
      },
    });
  }

  public async updateToken(email: string, token: string) {
    return await Prisma.accountActivationToken.update({
      where: {
        email: email,
        token,
      },
      data: {
        token_used: true,
      },
    });
  }

  public async expireToken(id: number) {
    return await Prisma.accountActivationToken.update({
      where: { id },
      data: { token_expire: true },
    });
  }

  public async updateResentToken(findTokenByEmail: any, codeGenerated: string) {
    return await Prisma.accountActivationToken.update({
      where: {
        id: findTokenByEmail.id,
      },
      data: {
        token: codeGenerated,
        resent: true,
        tokens_old: `${findTokenByEmail?.tokens_old ?? ""}${
          findTokenByEmail?.tokens_old ? "," : ""
        }${findTokenByEmail?.token}`,
        times_resent: findTokenByEmail?.times_resent + 1,
      },
    });
  }

  public async findRecoveryTokenAccount(email: string) {
    return await Prisma.recoverTokens.findFirst({
      where: {
        email: email,
        token_expired: false,
      },
    });
  }

  public async createToken(user: any, token: string) {
    return await Prisma.recoverTokens.create({
      data: {
        email: user.email,
        user_reference: user.user_reference,
        token,
      },
    });
  }

  public async updateRecoveryAccontTokenToUsed(token: string) {
    return await Prisma.recoverTokens.update({
      where: {
        token,
      },
      data: {
        token_used: true,
      },
    });
  }

  public async updatePassword(email: string, password: string): Promise<any> {
    return await Prisma.users.update({
      where: {
        email,
      },
      data: {
        password,
      },
    });
  }

  public async expireRecoveryToken(email: string, token: string) {
    return await Prisma.recoverTokens.update({
      where: {
        email,
        token,
      },
      data: {
        token_expired: true, // Renamed for clarity
      },
    });
  }
}

export default new AuthRepository();
