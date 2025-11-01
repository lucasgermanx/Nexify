import * as yup from "yup";

export const UserValidator = yup.object({
  user_reference: yup.string().required(),
  name: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  user_discord: yup.string().required(),
});

export const UserPasswordValidator = yup.object({
  user_reference: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirm_password: yup.string().required()
});
