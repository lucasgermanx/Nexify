type Status = 'pending' | 'active' | 'blocked' | 'banned' | 'suspense';

// Definição do tipo User
export type User = {
  id: number;
  user_reference: string;
  name: string;
  email: string;
  password: string;
  phone: string | null;
  avatar: string | null;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

export type RegisterResponse = {
    status: number;
    failed: boolean;
    message: string;
  };
  
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
  