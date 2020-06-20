import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import './_dropdownItems.scss';

class DropdownItems extends PureComponent {
  render() {
    const { children , dropdownStatus} =  this.props;

    return (
      <div className={`left-side-nav-item__dropdown-content ${dropdownStatus}`}>
        {children}
      </div>
    );
  }
}

DropdownItems.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  dropdownStatus: PropTypes.string.isRequired
};

DropdownItems.defaultProps = {
  children: {}
};

export default DropdownItems;
