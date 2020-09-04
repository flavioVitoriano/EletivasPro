/**
 *
 * Button
 *
 */

import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

const Button = ({ onClick, children }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
);

Button.defaultProps = {
  onClick: noop,
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default memo(Button);
