import { axios, disableTransform } from 'api';

export const endpoints = {
  signIn: 'auth/signin',
};

export default {
  signInUser: userData =>
    axios.post(endpoints.signIn, userData, disableTransform),
};
