import { axios } from 'api';

export const endpoints = {
  users: '/api/v1/users/',
  me: '/me/',
  alunos: '/v1/alunos/',
};

export default {
  getUser: () => axios.get(endpoints.me),
  getUsers: () => axios.get(endpoints.users),
  getAlunos: params => axios.get(endpoints.alunos, { params }),
};
