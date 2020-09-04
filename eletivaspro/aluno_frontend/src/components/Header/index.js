/**
 *
 * Header
 *
 */

import { Icon, Layout, Menu } from 'antd';
import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import { useSelector } from 'utils/hooks';
// import { makeSelectAuthenticate } from '../../containers/App/selectors';

const { Header } = Layout;
// const { SubMenu } = Menu;

const AppHeader = () => {
  // const isAuthenticated = useSelector(makeSelectAuthenticate());

  return (
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['0']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="0">
          <Link to="/">EletivasPro</Link>
        </Menu.Item>

        <Menu.Item key="1">
          <Link to="/">Registrar</Link>
        </Menu.Item>

        <Menu.Item key="3">
          <Link href="#gestao">Gestão</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

Header.propTypes = {};

export default memo(AppHeader);
