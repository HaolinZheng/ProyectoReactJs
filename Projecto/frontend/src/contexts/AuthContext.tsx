import { createContext } from "react";
interface AuthContextType {
  isAuthenticated: boolean | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
export default AuthContext;