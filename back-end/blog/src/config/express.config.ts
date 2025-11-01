import Router from './routes.config'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { corsOptions } from './security/cors.security';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import session from 'express-session';

const app = express();
dotenv.config();

export class ExpressConfiguration {
  /**
   * Inicia o servidor da aplicação Express.
   * Imprime informações sobre a aplicação e o servidor.
   */
  async startApp(): Promise<void> {
    app.listen(process.env.HOST_PORT, () => {
      console.log(`Application running: http://${process.env.HOST}:${process.env.HOST_PORT}/`);
    });
  }

  /**
   * Configura e inicializa a aplicação Express.
   * Define middlewares, configurações de sessão, roteamento e outros recursos da aplicação.
   */
  async App(): Promise<void> {
    // Configuração de sessão
    app.use(session({ secret: `${process.env.SECRET_SESSION}`, resave: true, saveUninitialized: true }));

    // Configuração de diretórios estáticos e mecanismo de visualização do EJS
    app.use(express.static(path.join(__dirname, '../../public/uploads/')));
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../Resources/views'));

    // Parser de cookies e corpo da requisição
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
    app.use(bodyParser.json({limit: '50mb'}));

    // Configuração do CORS
    app.use(cors(corsOptions));

    // Configuração de diretórios estáticos adicionais
    app.use(express.static(path.join(__dirname, 'src')));

    // Configuração de rotas
    Router(app);
  }
}
