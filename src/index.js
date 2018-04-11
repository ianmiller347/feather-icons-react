import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconInner from './IconInner';

class FeatherIcon extends Component {
  render() {
    const { icon, size, className, ...otherProps } = this.props;

    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`feather feather-${icon} ${className}`}
        {...otherProps}>
        <IconInner icon={icon} />
      </svg>
    );
  }
}

FeatherIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
}

FeatherIcon.defaultProps = {
  size: 24,
  className: ''
}

export default FeatherIcon;
