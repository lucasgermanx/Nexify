import { ErrorFormHandler } from "../handlers/ErrorFormHandler";
import { isString } from "../utils/Validators/isString";

export const CheckoutStoreValidator = () => {
  const { addError, getErrorByType } = ErrorFormHandler();

  const CheckoutStoreValidators = {
    store: (value: any) => {
      const validatedStore = isString(value);
      if (!validatedStore || value.length < 3) {
        addError({
          type: "store",
          isInvalid: true,
          message:
            "O nome da loja deve ter no mínimo 3 caracteres <br/> e não pode conter caracteres especiais",
        });
        return false;
      } else {
        addError({ type: "store", isInvalid: false, message: "" });
        return true;
      }
    },
    subdomain: (value: any) => {
      const validatedSubdomain = isString(value);
      if (!validatedSubdomain || value.length < 3) {
        addError({
          type: "subdomain",
          isInvalid: true,
          message:
            "O subdominio deve ter no mínimo 3 caracteres <br/> e não pode conter caracteres especiais",
        });
        return false;
      } else {
        addError({ type: "subdomain", isInvalid: false, message: "" });
        return true;
      }
    },
    store_money_type: (value: any) => {
      addError({ type: "store", isInvalid: false, message: "" });
      return true;
    },
  } as any;

  return { CheckoutStoreValidators, getErrorByType };
};
