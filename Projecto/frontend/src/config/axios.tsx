import axios from 'axios';
import { User, UserForm , Project} from './types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4321',
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
 },
});

export const getUser = async () => {
  return await axiosInstance.get<User[]>("/users");
};

export const getUserById = async (id: number) => {
  return await axiosInstance.get<User>(`/users/${id}`);
};

export const postUser = async (data: UserForm) => {
  return await axiosInstance.post("/users", data);
};

export const login = async (data: UserForm) => {
  return await axiosInstance.post("/users/login", data);
};

export const signup = async (data: UserForm) => {
  return await axiosInstance.post("/users/signup", data);
};

export const isLoged = async () => {
  return await axiosInstance.get<boolean>("/isloged");
};

export const logOut = async () => {
  return await axiosInstance.post("/logout");
};

export const getProyect = async () => {
  return await axiosInstance.get<Project[]>("/project");
};