import React from 'react';
import DropdownItems from '../DropdownItems';
import DropdownIcon from '../DropdownIcon/DropdownIcon';

export default class DropdownHelper {

  getElements(options, children) {
    this.options =options;
    this.dropdownContents = children;

    const dropdownContents = this._getDropdownContents();
    const dropdownIcon = this._getDropdownIcon();

    return {
      items: dropdownContents,
      icon: dropdownIcon
    };
  }

  _getStatus() {
    const  dropdownStatus = this.options.dropdownOpen? 'active': 'inactive';
    return dropdownStatus;
  }

  _getDropdownContents() {
    const status = this._getStatus();

    return (
      <DropdownItems dropdownStatus={status}>
        { this.dropdownContents }
      </DropdownItems>
    );
  }

  _getDropdownIcon() {
    const { linkIsActive } = this.options;
    const status = this._getStatus();

    return <DropdownIcon options={{linkIsActive, status}} />;
  }
}
