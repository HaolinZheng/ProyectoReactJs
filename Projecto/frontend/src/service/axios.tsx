import axios from 'axios';
import { User, UserForm } from '../config/types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4321',
  timeout: 5000,
  // withCredentials: true,
//  headers: {
//    'Content-Type': 'application/json',
//    'Authorization': "Bearer " //!+ ACCESS_TOKEN
//  },
});

export const getUser = async () => {
  return await axiosInstance.get<User[]>("/users");
};

export const getUserById = async (id: number) => {
  return await axiosInstance.get<User>(`/users/${id}`);
};

export const postUser = async (data: UserForm) => {
  console.log(data)
  return await axiosInstance.post("/", data);
};