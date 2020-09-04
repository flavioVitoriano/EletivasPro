import rootAxios from 'axios';
import { requestToSnakeCase, responseToCamelCase } from 'utils/network';

import { configInterceptors } from './interceptor';

const { transformRequest, transformResponse } = rootAxios.defaults;

const baseURL = process.env.REACT_APP_API_BASE_URL;

const axios = rootAxios.create({
  baseURL,
  transformRequest: [requestToSnakeCase, ...transformRequest],
  transformResponse: [responseToCamelCase, ...transformResponse],
});

configInterceptors(axios);

const disableTransform = { headers: { disableTransform: true } };

export { axios, disableTransform };
