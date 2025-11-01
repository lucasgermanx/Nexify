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