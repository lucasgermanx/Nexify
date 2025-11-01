import { NodemailerTransporter } from "@/Config/Nodemailer";
import ejs from "ejs";

async function SendEmail(
  to: string,
  subject: string,
  template: string,
  data: object
) {
  console.log(to, subject, template, data);
  try {
    const renderedTemplate = await ejs.renderFile(
      `/var/www/back-end/emails/src/Lib/Resources/Emails/${template}`,
      data
    );

    const mailOptions = {
      from: "contato@fivemarket.com.br",
      to,
      subject,
      html: renderedTemplate,
    };

    const info = await NodemailerTransporter.sendMail(mailOptions);
    console.log("E-mail enviado:", info.messageId);
  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error);
  }
}

export default SendEmail;
