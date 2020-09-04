import { selectLanguageProviderDomain } from 'containers/LanguageProvider/selectors';
import { store } from 'store';

export const configInterceptors = axios => {
  axios.interceptors.request.use(config => {
    const { locale } = selectLanguageProviderDomain(store.getState());

    if (locale) {
      config.headers.common['Accept-Language'] = locale;
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
