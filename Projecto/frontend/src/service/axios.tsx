import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/4321',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': "Basic " + btoa('admin@elpuig.xeill.net' + ":" + '2444')
  },
});

export const getUser = () => {
  axiosInstance.get('/users')
    .then(resp => {
      return resp
    })
    .catch(error => {
      return error
    })
};

export const getUserById = (id: number) => {
  axiosInstance.get(`/users/${id}`)
    .then(resp => {
      return resp
    })
    .catch(error => {
      return error
    })
};