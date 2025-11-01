import SendEmail from "@/Lib/Services/SendEmailService";
import dotenv from "dotenv";

dotenv.config();

export const WelcomeService = (message: string) => {
  if (message.length != 0) {
    const messageDecrypt = message;
    const data = JSON.parse(messageDecrypt);
    SendEmail(data.email, "[FiveMarket] - Bem-vindo (a)", "Welcome.ejs", {
      url_account_activate: process.env.URL_ACTIVATE_ACCOUNT,
      ...data,
    });
  } else {
    console.log("Nenhuma mensagem recebida");
  }
};
