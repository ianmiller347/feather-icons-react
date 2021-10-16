import React from 'react';
import PropTypes from 'prop-types';
// for now this icons json is generated via the build script from latest feather
// TODO: automatically generate this JSON via this repo's build script
import icons from './icons.json';

const createMarkup = (markup) => {
  // we dont sanitize markup 
  // since icons.json is maintained within the package before build
  return { __html: markup };
};

const IconInner = ({ icon }) => {
  // icons are based on generated icons.json from feather lib
  const iconMarkup = icons[icon];

  if (iconMarkup) {
    // i didnt want to use dangerouslySetInnerHTML
    // but this way I can just use the JSON to spit out SVG.
    return <g dangerouslySetInnerHTML={createMarkup(iconMarkup)} />;
  }
  return null;
};

IconInner.propTypes = {
  icon: PropTypes.string.isRequired
};

export default IconInner;
