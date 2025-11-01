import { Application } from 'express';
import fs from 'fs';
import kleur from 'kleur';
import path from 'path';

const routesPath = path.join(__dirname, '../lib/routes');

function Router(app: Application): void {
  const files = fs.readdirSync(routesPath);

  if (files.length === 0) {
    console.log(kleur.red('Nenhum arquivo encontrado na rota.'));
    return;
  }

  files.forEach((file: string) => {
    const routePath = path.join(routesPath, file);
    const route = require(routePath).default;

    if (typeof route === 'function') {
      route(app);
      console.log(kleur.green(`Rota carregada: ${path.basename(routePath)}`));
    } else {
      console.log(kleur.red(`Invalid route export in file: ${routePath}`));
    }
  });
}

export default Router;
