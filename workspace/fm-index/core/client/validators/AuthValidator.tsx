import EmailValidator from "../utils/Validators/EmailValidator";
import { ErrorFormHandler } from "../handlers/ErrorFormHandler";

export const AuthValidator = () => {
  const { addError, getErrorByType } = ErrorFormHandler();

  const AuthValidators = {
    email: (value: any) => {
      const validationErrors = EmailValidator.validate(value);

      if (validationErrors) {
        const errorMessage = validationErrors.join("\n");
        addError({ type: "email", isInvalid: true, message: errorMessage });
        return false;
      } else {
        addError({ type: "email", isInvalid: false, message: "" });
        return true;
      }
    },
    password: (value:any) => {
      if(value < 1){
        addError({ type: "password", isInvalid: true, message: "Senha inválida" });
        return false;
      }else{
        addError({ type: "password", isInvalid: false, message: "" });
        return true;
      }
    }
  } as any;

  return { AuthValidators, getErrorByType };
};
