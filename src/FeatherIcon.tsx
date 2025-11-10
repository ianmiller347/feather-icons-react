import React from 'react';
import type { FeatherIconProps } from './types';
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
  strokeWidth = 2,
  ...props
}: FeatherIconProps) => {
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
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather feather-${icon} ${className}`}
      {...props}
    >
      <IconInner icon={icon} />
    </svg>
  );
};

export default FeatherIcon;
