/**
 *
 * Select
 *
 */

import map from 'lodash/map';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

const Select = ({ value, options, messages, onSelect }) => {
  const handleChange = event => onSelect(event.target.value);
  return (
    <select value={value} onChange={handleChange}>
      {map(options, option => (
        <option key={option} value={option}>
          {messages[option]}
        </option>
      ))}
    </select>
  );
};

Select.defaultProps = {
  options: [],
};

Select.propTypes = {
  onSelect: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default memo(Select);
