type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  modified_at?: Date;
};

interface Project {
  id?: number;
  name: string;
  description?: string;
  start_and_created_at?: Date;
  end_at?: Date;
  modified_at?: Date;
};

export type { User , Project };