import { ErrorFormHandler } from "../handlers/ErrorFormHandler";
import PasswordValidator from "../utils/Validators/PasswordValidator";

export const AlterPasswordValidator = () => {
  const { addError, getErrorByType } = ErrorFormHandler();

  const AlterPasswordValidators = {
    password: (value: any) => {
      const validationErrors = PasswordValidator.validate(value);

      if (validationErrors) {
        const errorMessage = validationErrors.join("\n");
        addError({ type: "password", isInvalid: true, message: errorMessage });
        return false;
      } else {
        addError({ type: "password", isInvalid: false, message: "" });
        return true;
      }
    },
    confirm_password: (value: any) => {
        const validationErrors = PasswordValidator.validate(value);
        
        if (validationErrors) {
          const errorMessage = validationErrors.join("\n");
          addError({ type: "confirm_password", isInvalid: true, message: errorMessage });
          return false;
        } else {
          addError({ type: "confirm_password", isInvalid: false, message: "" });
          return true;
        }
      }
  } as any;

  return { AlterPasswordValidators, getErrorByType };
};
