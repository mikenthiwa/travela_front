import React from 'react';
import { PropTypes } from 'prop-types';
import activeDropdrownIcon from '../../../../../images/icons/dropdown_active.svg';
import inactiveDropdownIcon from '../../../../../images/icons/dropdown_inactive.svg';
import './_dropdownIcon.scss';

class DropdownIcon extends React.PureComponent {
  render() {
    const { options } = this.props;
    const { status, linkIsActive } = options;
    // a link can be active while the dropdown status is inactive
    return  (
      <div
        className={`dropdown-icon ${status}`}>
        <img src={linkIsActive? activeDropdrownIcon: inactiveDropdownIcon} alt="dropdown" />
      </div>
    );
  }
}

DropdownIcon.propTypes = {
  options: PropTypes.object.isRequired,
};

export default DropdownIcon;
