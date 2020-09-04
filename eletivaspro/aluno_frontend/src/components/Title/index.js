/**
 *
 * Title
 *
 */

import PropTypes from 'prop-types';
import React, { memo } from 'react';

const Title = ({ text }) => <h3>{text}</h3>;

Title.propTypes = {
  text: PropTypes.string,
};

export default memo(Title);
