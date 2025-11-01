import { CustomerCreateService } from "@/app/asaas/services/customer-create.service";
import { generateRandomUserId } from "@/app/utils/generate-user-id.utils";
import { AuthConfig } from "@/config/auth.config";
import { eventEmitter } from "@/config/events.config";
import { IRegister } from "@/interfaces/register-account.interface";
import bcrypt from "bcrypt";
import authRepository from "../repositories/auth.repository";
import { generateRandomToken } from "@/app/utils/GenerateRandomToken";

export const RegisterAccountService = async (dataPayload: IRegister) => {
  const getUserByEmail = await authRepository.findUserByEmail(
    dataPayload.email
  );

  if (getUserByEmail != null) {
    return {
      status: 401,
      failed: true,
      message: "O usuário já está registrado. Por favor, tente novamente.",
    };
  }

  const user_reference = generateRandomUserId();

  const createCustomer = await CustomerCreateService({
    email: dataPayload.email,
    name: dataPayload.name,
    cpf: dataPayload.cpf,
    externalReference: user_reference,
    groupName: "Essentials",
  });

  if (createCustomer.failed == true) {
    return {
      status: 401,
      failed: true,
      message: "O usuário não foi registrado. Por favor, tente novamente.",
    };
  }

  const hash = bcrypt.hashSync(
    dataPayload.password,
    new AuthConfig().bcryptConfig.saltRounds
  );

  const token = generateRandomToken();

  const createUser = await authRepository.createAccount(
    user_reference,
    createCustomer.customer_id,
    { ...dataPayload, password: hash },
    token
  );

  if (!createUser) {
    return {
      status: 401,
      failed: true,
      message: "O usuário não foi registrado. Por favor, tente novamente.",
    };
  }

  eventEmitter.emit("user:create", {
    name: dataPayload.name,
    email: dataPayload.email,
    token: token,
  });

  return {
    status: 200,
    failed: false,
    message: "Usuario registrado com sucesso!",
  };
};
