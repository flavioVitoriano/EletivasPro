/**
 *
 * LoadingIndicator
 *
 */

import { Col, Row, Spin } from 'antd';
import React from 'react';

const LoadingIndicator = () => (
  <Row>
    <Col className="text-center">
      <Spin />
    </Col>
  </Row>
);

export default LoadingIndicator;
