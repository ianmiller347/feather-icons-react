import React from 'react';
import FeatherIcon from '../';

export default {
  title: 'All Icons',
  component: FeatherIcon,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => <FeatherIcon {...args} />;

export const IconSelector = Template.bind({});
IconSelector.args = {
  icon: 'plus',
  size: 24,
  className: 'custom-icon feather',
  fill: 'none',
  strokeWidth: 2,
};
