import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import Router from './routes.config';
import { corsOptions } from './security/cors.security';
import { TransactionsConsumer } from '@/app/rabbit-mq/consumers/transaction-consumer';

const app = express();
dotenv.config();

export class ExpressConfiguration {
  /**
   * Inicia o servidor da aplicação Express.
   * Imprime informações sobre a aplicação e o servidor.
   */
  async startApp(): Promise<void> {
    app.listen(process.env.API_PORT, () => {
      console.log(`Application running: http://127.0.0.1:${process.env.API_PORT}/`);
    });
  }

  /**
   * Configura e inicializa a aplicação Express.
   * Define middlewares, configurações de sessão, roteamento e outros recursos da aplicação.
   */
  async App(): Promise<void> {
    // Parser de cookies e corpo da requisição
    app.use(cookieParser());
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());

    // Configuração do CORS
    app.use(cors(corsOptions));

    // Configuração de diretórios estáticos adicionais
    app.use(express.static(path.join(__dirname, 'src')));

    // Configuração de rotas
    Router(app);
    TransactionsConsumer()
  }
}
