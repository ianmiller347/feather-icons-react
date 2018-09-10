import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
// for now this icons json is generated via the build script from latest feather
// TODO: automatically generate this JSON via this repo's build script
import icons from './icons.json';

class IconInner extends PureComponent {
  createMarkup(markup) {
    // sanitize markup first:
    const sanitizedMarkup = this.sanitizeMarkup(markup);
 
    // now do the weird thing for dangerouslySetInnerHTML
    return { __html: sanitizedMarkup };
  }

  sanitizeMarkup(markup) {
    // For server environement
    if (!window) {
      // We create a window out of JSDOM
      const window = (new JSDOM('')).window;
      // Then we plug it to DOMPurify
      const DOMPurifyServer = DOMPurify(window);
      // and finally sanitize the markup
      return  DOMPurifyServer.sanitize(markup);
    }

    // Sanitize the markup
    return  DOMPurify.sanitize(markup);
  }

  render() {
    // <g> is just a wrapper it does nothing except let me use valid JSX markup
    // icons are based on generated icons.json from feather lib
    const { icon } = this.props;
    const iconMarkup = icons[icon];

    if (iconMarkup) {
      // i didnt want to use dangerouslySetInnerHTML
      // but i am sanitizing the markup first
      // and this way I can just use the JSON to spit out SVG
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
