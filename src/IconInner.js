import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// for now this icons json is generated via the build script from latest feather
// TODO: automatically generate this JSON via this repo's build script
import icons from './icons.json';

class IconInner extends PureComponent {
  createMarkup(markup) {
    // we dont sanitize markup 
    // since icons.json is maintained within the package before build
    // do the weird thing for dangerouslySetInnerHTML
    return { __html: markup };
  }

  render() {
    // <g> is just a wrapper it does nothing except let me use valid JSX markup
    // icons are based on generated icons.json from feather lib
    const { icon } = this.props;
    const iconMarkup = icons[icon];

    if (iconMarkup) {
      // i didnt want to use dangerouslySetInnerHTML
      // but this way I can just use the JSON to spit out SVG.
      // another possible option is to use the feather lib functions
      // which create the SVG files, then an SVG loader could be used.
      // i am open to this for a future version.
      return (
        <g dangerouslySetInnerHTML={this.createMarkup(iconMarkup)} />
      );
    }
    return null;
  }
}

IconInner.propTypes = {
  icon: PropTypes.string.isRequired
};

export default IconInner;
