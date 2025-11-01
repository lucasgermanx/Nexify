import { ActivateAccountController } from '@/app/auth/controllers/activate-account.controller';
import { AuthController } from '@/app/auth/controllers/auth.controller';
import { ConfirmTokenResetPasswordController } from '@/app/auth/controllers/confirm-token-reset-password.controller';
import { RecoverAccountController } from '@/app/auth/controllers/recover-account.controller';
import { RegisterAccountController } from '@/app/auth/controllers/register-account.controller';
import { ResentActivateAccountController } from '@/app/auth/controllers/resent-activate-account.controller';
import { ResetPasswordController } from '@/app/auth/controllers/reset-password.controller';
import { UserController } from '@/app/auth/controllers/user.controller';
import { Application } from 'express';

const AuthRouter = (app: Application): void => {
  app.post('/auth/login', AuthController);
  app.post('/auth/register', RegisterAccountController);
  
  app.post('/auth/activate/account/', ActivateAccountController);
  app.post('/auth/resent/activate/account', ResentActivateAccountController);
  
  app.get('/auth/user', UserController);
  
  app.post('/auth/recover/password/account', RecoverAccountController);
  app.post('/auth/recover/password/confirm/token/', ConfirmTokenResetPasswordController);
  app.post('/auth/recover/password/reset', ResetPasswordController)
}

export default AuthRouter