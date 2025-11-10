import React from 'react';
import icons from './icons.json';
import type { FeatherIconName, FeatherNamedIconProps } from './types';
// for now this icons json is generated via the build script from latest feather
// TODO: automatically generate this JSON via this repo's build script

interface IconInnerProps extends FeatherNamedIconProps {
  icon: FeatherIconName;
}

const IconInner = ({ icon }: IconInnerProps): React.ReactNode => {
  const iconMarkup = icons[icon];
  if (!iconMarkup) {
    return null;
  }
  return <g dangerouslySetInnerHTML={{ __html: iconMarkup }} />;
};

export default IconInner;
