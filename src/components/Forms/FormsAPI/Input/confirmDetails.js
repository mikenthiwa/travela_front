import React, {Component} from 'react';
import Input from './index';

class InputRenderer{
  constructor(formMetadata) {
    this.formMetadata = formMetadata;
  }

  // eslint-disable-next-line react/display-name
  createInput = props => <Input {...props} />;

  switchDetailsProps(name, type, confirmInputDetails) {
    const formMetadata = this.formMetadata || {};
    switch (type) {
    case 'filter-dropdown-select':
      confirmInputDetails.choices = this.formMetadata.dropdownSelectOptions[name];
      return confirmInputDetails;
    case 'onboarding-button-toggler':
      confirmInputDetails.choices = (formMetadata.buttonToggleOptions || {})[name];
      return confirmInputDetails;
    default:
      return confirmInputDetails;
    }
  }
  renderInput = (name, type, customProps) => {
    const selection = customProps && customProps.selection;
    const labelKey = name.split('-')[0];
    const fieldName = (labelKey.match('arrivalDate') && (selection && !selection.match('return')))
      ? 'leavingDate' : labelKey;
    let confirmInputDetails = {
      name,
      type,
      label: this.formMetadata.confirmPersonalInputLabels[fieldName].label,
      labelNote: customProps ? customProps.labelNote :
        this.formMetadata.confirmPersonalInputLabels[fieldName].note,
      autoComplete: 'off'
    };
    customProps ? confirmInputDetails['data-parentid'] = customProps.parentid : null;
    confirmInputDetails = this.switchDetailsProps(name, type, confirmInputDetails);
    confirmInputDetails = {
      ...confirmInputDetails,
      ...customProps
    };
    return this.createInput(confirmInputDetails);
  }
}

export {Input};
export default InputRenderer;
