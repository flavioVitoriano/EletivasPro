/**
 *
 * Tests for PrivateRoute
 *
 */

import { ConnectedRouter, push } from 'connected-react-router';
import { loginUser } from 'containers/App/actions';
import { makeSelectAuthenticate } from 'containers/App/selectors';
import React from 'react';
import { Route } from 'react-router';
import { history, store } from 'store';
import { useSelector } from 'utils/hooks';
import { HooksWrapper, queryByTestId, render } from 'utils/testLibrary';

import PrivateRoute from '../index';

const token = 'testToken';

const homeTestId = 'homePage';
const signInTestId = 'signInPage';

const HomePage = () => <div data-testid={homeTestId}>Home</div>;
const SignInPage = () => <div data-testid={signInTestId}>SignIn</div>;

const paths = {
  home: '/',
  signIn: '/sign-in',
};

const routes = () => [
  {
    path: paths.home,
    component: HomePage,
    exact: true,
    auth: true,
  },
  {
    path: paths.signIn,
    component: SignInPage,
  },
];

const renderComponent = () =>
  render(
    <ConnectedRouter history={history}>
      <HooksWrapper hooks={() => useSelector(makeSelectAuthenticate())}>
        {isAuthenticated => (
          <>
            <PrivateRoute
              path={routes()[0].path}
              component={routes()[0].component}
              exact={routes()[0].exact}
              redirectPath="/sign-in"
              isAuthenticated={isAuthenticated}
            />
            <Route
              path={routes()[1].path}
              component={routes()[1].component}
              exact={routes()[1].exact}
            />
          </>
        )}
      </HooksWrapper>
    </ConnectedRouter>,
  );

describe('<PrivateRoute />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <ConnectedRouter history={history}>
        <PrivateRoute
          path={paths.home}
          component={HomePage}
          redirectPath={paths.signIn}
          isAuthenticated
        />
      </ConnectedRouter>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('should redirect to SignInPage component when auth token is not present', () => {
    const { container } = renderComponent();
    store.dispatch(push(paths.home));
    expect(queryByTestId(container, signInTestId)).toBeInTheDocument();
  });

  it('should redirect to HomePage component when auth token is present', () => {
    const { container } = renderComponent();
    store.dispatch(loginUser(token));
    store.dispatch(push(paths.home));
    expect(queryByTestId(container, homeTestId)).toBeInTheDocument();
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <ConnectedRouter history={history}>
        <PrivateRoute
          path={paths.home}
          component={HomePage}
          redirectPath={paths.signIn}
          isAuthenticated
        />
      </ConnectedRouter>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
