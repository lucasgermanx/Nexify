import CPFValidator from "../utils/Validators/CPFValidator";
import EmailValidator from "../utils/Validators/EmailValidator";
import { ErrorFormHandler } from "../handlers/ErrorFormHandler";
import PasswordValidator from "../utils/Validators/PasswordValidator";
import { isString } from "../utils/Validators/isString";
import { validateBirthDate } from "../utils/Validators/validateBirthDate";

export const RegisterValidator = () => {
  const { addError, getErrorByType } = ErrorFormHandler();

  const RegisterValidators = {
    name: (value: any) => {
      const validateName = isString(value)
      if(!validateName || value.length < 3){
        addError({ type: "name", isInvalid: true, message: "O nome deve ter no mínimo 3 caracteres <br/> e não pode conter números ou caracteres especiais" });
        return false
      }else{
        addError({ type: "name", isInvalid: false, message: "" });
        return true;
      }
    },
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
    birth: (value:any) => {
      const validatedBirth = validateBirthDate(value)

      if (validatedBirth?.isValid == false) {
        addError({ type: "birth", isInvalid: true, message:`${validatedBirth?.message }`});
        return false;
      } else {
        addError({ type: "birth", isInvalid: false, message: "" });
        return true;
      }
    },
    cpf: (value: any) => {
      const validationErrors = CPFValidator.validate(value);
      if (validationErrors) {
        const errorMessage = validationErrors.join("\n");
        addError({ type: "cpf", isInvalid: true, message: errorMessage });
        return false;
      } else {
        addError({ type: "cpf", isInvalid: false, message: "" });
        return true;
      }
    },
    user_discord: (value:any) => {
      if (value === "") {
          addError({ type: "user_discord", isInvalid: false, message: "" });
          return true;
      }
      const isNumericString = /^[0-9]{18}$/.test(value);
      if (!isNumericString) {
          addError({ type: "user_discord", isInvalid: true, message: "O ID do Discord deve conter exatamente 18 números." });
          return false;
      } else {
          addError({ type: "user_discord", isInvalid: false, message: "" });
          return true;
      }
  },  
    password:(value:any) => {
      const validationErrors = PasswordValidator.validate(value);

    if (validationErrors) {
      const errorMessage = validationErrors.join("\n");
      addError({ type: "password", isInvalid: true, message: errorMessage });
      return false;
    } else {
      addError({ type: "password", isInvalid: false, message: "" });
      return true;
    }
    }
  } as any;

  return { RegisterValidators, getErrorByType };
};
