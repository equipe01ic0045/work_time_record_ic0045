export type UserLogin = {
  email: string;
  password: string;
};

export type User = {
  user_id: number;
  cpf: string;
  email: string;
  full_name: string;
  password?: string;
  created_at?: string;
  updated_at?: string;
};
