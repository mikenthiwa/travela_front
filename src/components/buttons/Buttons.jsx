import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

/**
 * @description - Contains Button component
 *
 * @class Button
 *
 * @extends {PureComponent}
 *
 */
class Button extends PureComponent {
  renderButtonBadge(badge, badgeClass) {
    return (
      <span className={badgeClass}>
        {badge}
      </span>
    );
  }
  render() {
    const {
      imageSrc,
      buttonClass,
      buttonId,
      altText,
      imageClass,
      text,
      responsiveText,
      textClass,
      onClick,
      disabled,
      badge,
      showBadge,
      badgeClass,
      reverseText
    } = this.props;
    return (
      <button
        type="button"
        disabled={disabled} className={buttonClass} onClick={onClick} id={buttonId}>
        {!reverseText && imageSrc && <img src={imageSrc} alt={altText} className={imageClass} />}
        <span className={`${textClass} mdl-cell--hide-phone`}>
          {text}
        </span>
        {reverseText && imageSrc && <img src={imageSrc} alt={altText} className={imageClass} />}
        <span className={`${textClass} mdl-cell--hide-desktop mdl-cell--hide-tablet`}>
          {responsiveText || text}
        </span>
        {showBadge && badge && this.renderButtonBadge(badge, badgeClass)}
      </button>
    );
  }
}

Button.propTypes = {
  imageSrc: PropTypes.string,
  buttonClass: PropTypes.string,
  buttonId: PropTypes.string,
  altText: PropTypes.string,
  imageClass: PropTypes.string,
  text: PropTypes.string,
  responsiveText: PropTypes.string,
  textClass: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  badge: PropTypes.number,
  showBadge: PropTypes.bool,
  badgeClass: PropTypes.string,
  reverseText: PropTypes.bool
};

Button.defaultProps = {
  imageSrc: '',
  buttonClass: 'mdl-button',
  imageClass: 'mdl-Icon',
  altText: '',
  buttonId: '',
  text: '',
  responsiveText: '',
  textClass: '',
  onClick: null,
  disabled: false,
  badge: null,
  showBadge: false,
  badgeClass: '',
  reverseText: false
};

export default Button;
