import { VariablesCreateController } from '@/app/variables/controllers/variables-create.controller';
import { VariableDeleteController } from '@/app/variables/controllers/variables-delete.controller';
import { VariablesUpdateController } from '@/app/variables/controllers/variables-update.controller';
import { VariablesController } from '@/app/variables/controllers/variables.controller';
import { Application } from 'express';

const VariablesRouter = (app: Application): void => {
  app.post('/store/variables/create', VariablesCreateController);
  app.post('/store/variables/update', VariablesUpdateController);
  app.post('/store/variables/delete', VariableDeleteController);
  app.get('/store/variables/:store_reference', VariablesController);
}

export default VariablesRouter