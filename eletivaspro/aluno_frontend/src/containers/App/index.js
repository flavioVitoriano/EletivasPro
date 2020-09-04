/**
 *
 * App
 *
 */

import { Layout } from 'antd';
import RoutesProvider from 'containers/RoutesProvider';
import React from 'react';

import Header from '../../components/Header/Loadable';

const { Content, Footer } = Layout;
const App = () => (
  <>
    <Layout className="layout">
      <Header />
      <RoutesProvider />
      <Footer style={{ textAlign: 'center' }}>
        VSoft ©2020 Created by Flávio Vitoriano
      </Footer>
    </Layout>

  </>
);
export default App;
