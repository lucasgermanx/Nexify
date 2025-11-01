export type userUpdate = {
    name: string;
    email: string;
    user_discord: string;
    user_reference: string;
    phone: string;
  };
  
  export type userUpdatePassword = {
    email: string;
    user_reference: string;
    password: string;
    confirm_password: string;
  };
  
  export type UserContextType = {
    ProviderUpdateUser: (userData: userUpdate) => void;
    ProviderUpdatePasswordUser: (data: userUpdatePassword) => void;
  };
  