import React, {Component} from 'react';
import Input from './Input';
import FormContext from './FormContext/FormContext';
import getDefaultBlanksValidatorFor from './formValidator';

class InputRenderer {
  constructor(formMetadata) {
    this.formMetadata = formMetadata;
  }

  switchProps(name, type, inputProps) {
    const formMetadata = this.formMetadata || {};
    switch (type) {
    case 'filter-dropdown-select':
      inputProps.choices = this.formMetadata.dropdownSelectOptions[name];
      return inputProps;
    case 'dropdown-select':
      inputProps.choices = (formMetadata.dropdownSelectOptions || {})[name.split('-')[0]];
      return inputProps;
    case 'button-toggler':
      inputProps.choices = (formMetadata.buttonToggleOptions || {})[name];
      return inputProps;
    case 'multiple-choice-dropdown':
      return inputProps;
    default:
      return inputProps;
    }
  }

  renderInput = (name, type, customProps) => {
    const selection = customProps && customProps.selection;
    const labelKey = name.split('-')[0];
    const fieldName = (labelKey.match('arrivalDate') && (selection && !selection.match('return')))
      ? 'leavingDate' : labelKey;
    let inputProps = {
      name,
      type,
      label: this.formMetadata.inputLabels[fieldName].label,
      labelNote: customProps ? customProps.labelNote :
        this.formMetadata.inputLabels[fieldName].note,
      autoComplete: 'off'
    };
    customProps ? inputProps['data-parentid'] = customProps.parentid : null;
    inputProps = this.switchProps(name, type, inputProps);
    inputProps = {
      ...inputProps,
      ...customProps
    };
    return createInput(inputProps);
  }
}

const createInput = props => <Input {...props} />;

export {Input, FormContext, getDefaultBlanksValidatorFor};
export default InputRenderer;
