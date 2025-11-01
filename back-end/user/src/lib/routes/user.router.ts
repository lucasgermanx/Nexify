import { Application } from 'express';
import userController from '../controllers/user.controller';
import userPasswordController from '../controllers/user-password.controller';
import userUpdateController from '../controllers/user-update.controller';

const UserRouter = (app: Application): void => {
  app.get('/user/reference/:user_reference', userController.GetUserByReference)
  app.post('/user/update', userUpdateController.Update);
  app.post('/user/update/password', userPasswordController.UpdatePassword)
}

export default UserRouter