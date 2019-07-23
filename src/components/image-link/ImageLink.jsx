import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

/**
 * @description - Contains Image Component
 *
 * @class ImageLink
 *
 * @extends {PureComponent}
 *
 */
class ImageLink extends PureComponent {
  render() {
    const { imageSrc, altText, imageClass } = this.props;
    return <img src={imageSrc} alt={altText} className={imageClass} />;
  }
}

ImageLink.propTypes = {
  imageSrc: PropTypes.string,
  altText: PropTypes.string,
  imageClass: PropTypes.string
};

ImageLink.defaultProps = {
  imageClass: 'mdl-Icon',
  altText: 'Dropdown Icon',
  imageSrc: 'imageSrc'
};

export default ImageLink;
