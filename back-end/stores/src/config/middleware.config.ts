import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

function setMiddleware(middlewareArray: string[]): Middleware {
  return function(req: Request, res: Response, next: NextFunction): void {
    middlewareArray.forEach(middleware => {
      const middlewarePath = path.join(__dirname, '../Lib/Middlewares', `${middleware}.ts`);

      if (fs.existsSync(middlewarePath)) {
        const middlewareModule = require(middlewarePath).default;
        if (typeof middlewareModule === 'function') {
          middlewareModule(req, res, next);
        } else {
          console.error(`Middleware "${middleware}" is not a function.`);
        }
      }
    });
    next();
  };
}

export default setMiddleware;
