import { ProductsCreateController } from '@/app/products/controllers/products-create.controller';
import { ProductsDeleteController } from '@/app/products/controllers/products-delete.controller';
import { ProductsFilterController } from '@/app/products/controllers/products-filter.controller';
import { ProductsTemplateController } from '@/app/products/controllers/products-template.controller';
import { ProductsUpdateController } from '@/app/products/controllers/products-update.controller';
import { Application } from 'express';
import multer from 'multer';

const upload = multer();

const ProductsRouter = (app: Application): void => {
  //@ts-ignore
  app.post('/store/products/create', upload.array('images'), ProductsCreateController);
  //@ts-ignore
  app.post('/store/products/update', upload.array('images'), ProductsUpdateController);
  app.post('/store/products/delete', ProductsDeleteController);
  app.get('/store/products/template/:store_reference', ProductsTemplateController);
  app.get('/store/products/filter/:store_reference/:filter', ProductsFilterController);
}

export default ProductsRouter