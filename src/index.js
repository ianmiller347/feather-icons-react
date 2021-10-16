import React from 'react';
import PropTypes from 'prop-types';
import IconInner from './IconInner';

/**
 * Feather icon
 * otherProps spread will be removed in version 1.
 * @param {icon} icon name that matches from feathericons 
 * @returns FeatherIcon react component
 */
const FeatherIcon = ({
  icon,
  size = 24,
  className = '',
  fill = 'none',
  ...otherProps
}) => {
  if (!icon) {
    return null;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather feather-${icon} ${className}`}
      {...otherProps}
    >
      <IconInner icon={icon} />
    </svg>
  );
};

FeatherIcon.propTypes = {
  icon: PropTypes.string.isRequired, // the icon name that matches exactly from feathericons
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  fill: PropTypes.string
};

export default FeatherIcon;
