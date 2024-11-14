import { createContext, ReactNode, useState } from "react";

type UsersContextType = {
  Users: User[];
  addUser: (user: User) => void;
};

const UsersContext = createContext<UsersContextType | null>(null);

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const fakeUsers: User[] = [
  {
    id: crypto.randomUUID(),
    name: "LoliEnjoyer",
    email: "a@a.aa",
    password: "1234"
  },
  {
    id: crypto.randomUUID(),
    name: "",
    email: "",
    password: ""
  },
];

type UsersProviderProps = {
  children: ReactNode;
};
function UsersProvider({ children }: UsersProviderProps) {
  const [Users, setUsers] = useState<User[]>(fakeUsers);

  function addUser(User: User) {
    setUsers([...Users, User]);
  }

  const valueToSend = {
    Users,
    addUser,
  };
  return (
    <UsersContext.Provider value={valueToSend}>
      {children}
    </UsersContext.Provider>
  );
}

export default UsersProvider;
export { UsersContext };
