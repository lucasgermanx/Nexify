import { CategoriesController } from '@/app/categories/controllers/categories-controller';
import { CategoriesCreateController } from '@/app/categories/controllers/categories-create.controller';
import { CategoriesDeleteController } from '@/app/categories/controllers/categories-delete.controller';
import { CategoriesUpdateController } from '@/app/categories/controllers/categories-update.controller';
import { Application } from 'express';

const CategoriesRouter = (app: Application): void => {
  app.get('/store/categories', CategoriesController);
  app.post('/store/categories/create', CategoriesCreateController);
  app.put('/store/categories/update', CategoriesUpdateController);
  app.post('/store/categories/delete', CategoriesDeleteController)
}

export default CategoriesRouter