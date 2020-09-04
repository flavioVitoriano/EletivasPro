/**
 *
 * RoutesProvider
 *
 */

import { PrivateRoute } from 'components';
import { makeSelectAuthenticate } from 'containers/App/selectors';
import map from 'lodash/map';
import React from 'react';
import { Route, Switch } from 'react-router';
import { useSelector } from 'utils/hooks';

import routes, { paths } from './routes';

const RoutesProvider = () => {
  const isAuthenticated = useSelector(makeSelectAuthenticate());
  return (
    <Switch>
      {map(routes(), ({ path, component, exact, auth }) =>
        auth ? (
          <PrivateRoute
            key={path}
            path={path}
            exact={exact}
            component={component}
            isAuthenticated={isAuthenticated}
            redirectPath={paths.redirectPage}
          />
        ) : (
          <Route key={path} path={path} exact={exact} component={component} />
        ),
      )}
    </Switch>
  );
};

export default RoutesProvider;
