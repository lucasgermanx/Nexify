import { Application } from 'express';
import multer from 'multer';
import PostsCreateController from '../controllers/posts-create.controller';
import PostsDeleteController from '../controllers/posts-delete.controller';
import PostsUpdateController from '../controllers/posts-update.controller';
import PostsController from '../controllers/posts.controller';

const upload = multer();

const PostsRouter = (app: Application): void => {
  //@ts-ignore
  app.post('/posts/create', upload.array('images'), PostsCreateController.Create);
  app.post('/posts/delete', PostsDeleteController.Delete);
  app.get('/posts/:store_reference', PostsController.Index);
  app.get('/posts/:store_reference/:post_reference', PostsController.GetPostByReference);
  //@ts-ignore
  app.post('/posts/update', upload.array('images'), PostsUpdateController.Update);
}

export default PostsRouter