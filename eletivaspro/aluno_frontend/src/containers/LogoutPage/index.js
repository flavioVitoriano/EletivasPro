/**
 *
 * LogoutPage
 *
 */

import { push } from 'connected-react-router';
import { logoutUser } from 'containers/App/actions';
import { useEffect } from 'react';
import { useAction } from 'utils/hooks';

import { paths } from '../RoutesProvider/routes';

const LogoutPage = () => {
  const logoutUserCallback = useAction(logoutUser);
  const pushHome = useAction(push);

  useEffect(() => {
    logoutUserCallback();
    pushHome(paths.homePage);
  }, [logoutUserCallback, pushHome]);

  return null;
};

export default LogoutPage;
