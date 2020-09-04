import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

export const paths = {
  homePage: '/',
  redirectPage: '/',
  notFoundPage: '',
};

const routes = () => [
  {
    path: paths.homePage,
    component: HomePage,
    exact: true,
    auth: false,
  },
  {
    path: paths.notFoundPage,
    component: NotFoundPage,
  },
];

export default routes;
