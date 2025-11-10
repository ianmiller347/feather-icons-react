import icons from './icons.json';
import type { SVGProps } from 'react';

export type FeatherIconName = keyof typeof icons;

export interface FeatherNamedIconProps
  extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  size?: string | number;
}

export interface FeatherIconProps extends FeatherNamedIconProps {
  icon: FeatherIconName;
}
