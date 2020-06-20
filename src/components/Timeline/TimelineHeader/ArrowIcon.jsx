import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

class ArrowIcon extends PureComponent {
  render() {
    const {iconClass, iconSrc, onClickIcon} = this.props;
    return (
      <div
        className={iconClass}
        style={{cursor: 'pointer', outline: 'none'}}
        onClick={onClickIcon}
        onKeyUp={()=>{}}
        tabIndex="0"
        role="button"
      >
        <img src={iconSrc} alt="dd" />
      </div>
    );
  }
}

ArrowIcon.propTypes = {
  iconClass : PropTypes.string,
  iconSrc : PropTypes.string.isRequired,
  onClickIcon: PropTypes.func
};

ArrowIcon.defaultProps = {
  iconClass: 'dropdown-icon',
  onClickIcon: () => {}
};

export default ArrowIcon;
