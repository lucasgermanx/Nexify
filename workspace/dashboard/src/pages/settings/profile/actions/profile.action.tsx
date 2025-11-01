import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/core/client/providers/auth/auth.provider";
import { useUser } from "@/core/client/providers/user/user.provider";

export const ProfileHandler = () => {
    const { register, handleSubmit, setValue } = useForm();
    const {ProviderUpdateUser} = useUser()

    const onSubmit = (data: any) => {
        ProviderUpdateUser(data)
    };

    return { register, handleSubmit, onSubmit, setValue };
};

export const ModalUpdatePasswordAction = () => {
    const [showModalUpdatePassword, setShowModalUpdatePassword] = useState(false);
  
    const showModalUpdateAction = () => {
      setShowModalUpdatePassword(true);
    };
  
    const closeModalUpdateAction = () => {
      setShowModalUpdatePassword(false);
    };
  
    return {showModalUpdateAction, closeModalUpdateAction, showModalUpdatePassword};
  };


export const UpdatePasswordAction = () => {
    const { register, handleSubmit, setValue } = useForm();
    const {user} = useAuth()
    const {ProviderUpdatePasswordUser} = useUser()

    const onSubmit = (data: any) => {
      ProviderUpdatePasswordUser({
        ...data,
        user_reference: user.user_reference,
        email: user.email
      })
    };

    return { register, handleSubmit, onSubmit, setValue };
};