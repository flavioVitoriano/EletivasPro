/* eslint-disable react/jsx-props-no-spreading */
/**
 *
 * PrivateRoute
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({
  path,
  component: Component,
  exact,
  isAuthenticated,
  redirectPath,
}) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={redirectPath} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  redirectPath: PropTypes.string.isRequired,
};

export default PrivateRoute;
