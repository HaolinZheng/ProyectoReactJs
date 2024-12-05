type GlobalItem = User | Project | Task

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  modified_at: Date;
};

type UserForm = Pick<User, 'name' | 'email' | 'password' >
type UserToUse = Pick<User, 'id' | 'name' | 'email' >

interface Project {
  id: number;
  name: string;
  description: string;
  start_and_created_at: Date;
  end_at: Date;
  modified_at: Date;
};

interface Task {
  id: number;
    project_id: string;
    title: string;
    description: string;
    assigned_to: number;
    priority: 'high' | 'medium' | 'low';
    status: 'pending'| 'in_progress' | 'completed';
    due_date: Date;
    created_at: Date;
    modified_at: Date;
};


// type UserPost2 = Omit<User, 'id' | 'created_at' | 'modified_at'>

export type { User , UserForm , UserToUse , GlobalItem , Project , Task };