import SendEmail from "@/Lib/Services/SendEmailService";
import dotenv from "dotenv";
dotenv.config();

export const ActivationAccountService = (message: string) => {
  if (message.length != 0) {
    const messageDecrypt = message;
    const data = JSON.parse(messageDecrypt);
    SendEmail(
      data.email,
      "[FiveMarket] - Ativação de conta",
      "Activate.ejs",
      data
    );
  } else {
    console.log("Nenhuma mensagem recebida");
  }
};
