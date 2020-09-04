import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import SignInPage from 'containers/SignInPage/Loadable';

import LogoutPage from '../LogoutPage';

export const paths = {
  homePage: '/',
  signInPage: '/sign-in',
  alunoPage: '/alunos',
  redirectPage: '/sign-in',
  notFoundPage: '',
  logout: '/logout',
};

const routes = () => [
  {
    path: paths.homePage,
    component: HomePage,
    exact: true,
    auth: true,
  },
  {
    path: paths.signInPage,
    component: SignInPage,
  },
  {
    path: paths.logout,
    component: LogoutPage,
  },
  // !Keep at last position!
  {
    path: paths.notFoundPage,
    component: NotFoundPage,
  },
];

export default routes;
