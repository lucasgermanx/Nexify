import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { env } from './env';
import Router from './routes.config';
import { corsOptions } from './security/cors.security';
dotenv.config();

const app = express();

export class ExpressConfiguration {
  /**
   * Inicia o servidor da aplicação Express.
   * Imprime informações sobre a aplicação e o servidor.
   */
  async startApp(): Promise<void> {
    app.listen(env.API_PORT, () => {
      console.log(`Application running: http://127.0.0.1:${env.API_PORT}/`);
    });
  }

  /**
   * Configura e inicializa a aplicação Express.
   * Define middlewares, configurações de sessão, roteamento e outros recursos da aplicação.
   */
  async App(): Promise<void> {
    // Parser de cookies e corpo da requisição
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Configuração do CORS
    app.use(cors(corsOptions));

    // Configuração de diretórios estáticos adicionais
    app.use(express.static(path.join(__dirname, 'src')));

    // Configuração de rotas
    Router(app);
  }
}
