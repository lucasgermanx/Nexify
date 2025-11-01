import contentUpdateDataController from '@/app/content/controllers/content-update-data.controller';
import contentUpdateFilesController from '@/app/content/controllers/content-update-files.controller';
import { Application } from 'express';
import multer from 'multer';

const upload = multer();

const ContentRouter = (app: Application): void => {
  //@ts-ignore
  app.post('/store/content/update/file', upload.array('images'),contentUpdateFilesController.UpdateFiles);
  //@ts-ignore
  app.post('/store/content/update', upload.array('images'), contentUpdateDataController.Update);
}

export default ContentRouter