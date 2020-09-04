import { selectToken } from 'containers/App/selectors';
import { selectLanguageProviderDomain } from 'containers/LanguageProvider/selectors';
import { store } from 'store';

export const configInterceptors = axios => {
  axios.interceptors.request.use(config => {
    const { locale } = selectLanguageProviderDomain(store.getState());
    const token = selectToken(store.getState());

    if (locale) {
      config.headers.common['Accept-Language'] = locale;
    }

    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  axios.interceptors.response.use(
    response =>
      // Do something with response data
      response,
    error =>
      // Do something with response error
      Promise.reject(error),
  );
};
