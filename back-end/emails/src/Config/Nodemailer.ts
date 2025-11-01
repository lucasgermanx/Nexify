import nodemailer from 'nodemailer';

export const NodemailerTransporter = nodemailer.createTransport({
  host: "smtp.titan.email",
  port: 465,
  auth: {
    user: "contato@fivemarket.com.br",
    pass: "@FiveMarket155157"
  }
});