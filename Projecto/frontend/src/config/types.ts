interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  modified_at?: Date;
};

type UserForm = Pick<User, 'name' | 'email' | 'password' >
// type UserPost2 = Omit<User, 'id' | 'created_at' | 'modified_at'>

export type { User , UserForm };