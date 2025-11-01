import { env } from '@/environments/env';
import { ProxyConfiguration } from '@/proxy';
import colors from 'colors';
import dotenv from 'dotenv';
import { fastify } from "fastify";
dotenv.config();

const app = fastify()
ProxyConfiguration(app)

const porta = parseInt(env.API_PORT ?? "3331", 10);

app.listen({ port: porta as number, host: '127.0.0.1'}, (err) => {
  if (err) {
    console.error("Error listening:", err);
    process.exit(1);
  }
  console.log(colors.green(`Local: http://127.0.0.1:${env.API_PORT} 🚀`));
  console.log(colors.cyan(`Ambiente: ${env.MODE || 'development'} ⚠️`));
  console.log(colors.yellow(`Data de inicialização: ${new Date().toLocaleString()} 🕗`));
});

export { app };

