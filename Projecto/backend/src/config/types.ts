type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  modified_at?: Date;
};


type Team = {
  id: number;
  name: string;
  password: string;
  created_at: Date;
  modified_at: Date;
};

export type { User };
