import SendEmail from "@/Lib/Services/SendEmailService";
import dotenv from "dotenv";
dotenv.config();

export const RecoverAccountService = (message: string) => {
  if (message.length != 0) {
    const messageDecrypt = message;
    const data = JSON.parse(messageDecrypt);
    SendEmail(
      data.email,
      "[FiveMarket] - Recuperação de conta",
      "RecoverAccountPassword.ejs",
      { url_recover_account: process.env.URL_RECOVER_ACCOUNT, ...data }
    );
  } else {
    console.log("Nenhuma mensagem recebida");
  }
};
