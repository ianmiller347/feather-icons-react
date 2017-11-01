import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FeatherIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { icon, size, ...otherProps } = this.props;

    return (
      <svg width={size}
           height={size}
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           strokeWidth="2"
           strokeLinecap="round"
           strokeLinejoin="round"
           className={`feather feather-${icon}`}
           {...otherProps}>
        {this._renderInner(icon)}
      </svg>
    );
  }

  _renderInner(icon) {
    /* this is just a bunch of if statements to return the innards of the svg
    *  based on the type of icon it is.
    *  yes it's ok to not use our width and height variables here.
    *  the sizes are relative based on the viewBox attribute.
    *  our width and height variables will scale the SVG accordingly.
    *  <g> is just a wrapper it does nothing except let me use valid JSX markup
    */
    if (icon === 'copy') {
      return (
        <g>
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </g>
      );
    }
    if (icon === 'x-circle') {
      return (
        <g>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </g>
      );
    }
    if (icon === 'plus-square') {
      return (
        <g>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </g>
      );
    }
    if (icon === 'save') {
      return (
        <g>
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
          <polyline points="17 21 17 13 7 13 7 21"></polyline>
          <polyline points="7 3 7 8 15 8"></polyline>
        </g>
      );
    }
    if (icon === 'delete') {
      return (
        <g>
          <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
          <line x1="18" y1="9" x2="12" y2="15"></line>
          <line x1="12" y1="9" x2="18" y2="15"></line>
        </g>
      );
    }
    if (icon === 'chevron-up') {
      return (
        <polyline points="18 15 12 9 6 15"></polyline>
      );
    }
    if (icon === 'chevron-down') {
      return (
        <polyline points="6 9 12 15 18 9"></polyline>
      );
    }
    if (icon === 'info') {
      return (
        <g>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12" y2="8"></line>
        </g>
      );
    }
    return;
  }
}

FeatherIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

FeatherIcon.defaultProps = {
  color: 'currentColor',
  size: 24
}

export default FeatherIcon;
