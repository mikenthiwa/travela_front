import React, { PureComponent, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import {
  HtmlInput,
  DropdownSelect,
  DateInput,
  ButtonToggler,
  NumberInput,
  filterDropdownSelect,
  CheckBox,
  TextArea, 
  TagsInput,
  MultipleChoiceDropdown,
  OnboardingButtonToggler,
} from './InputFields';
import createEventHandlersFor from '../formEventHandlers';
import './_input.scss';
import './InputFields/Date.scss';

class Input extends PureComponent {

  getInputType() {
    let { name, type } = this.props;
    const { targetForm, validatorName } = this.context;
    // get event handlers for the form in this context, for its input named 'name'
    const eventHandlers = createEventHandlersFor(targetForm, name, validatorName);
    return this.switchTypeWithProps(type, eventHandlers);
  }

    switchTypeWithProps = (type, eventHandlers) => {
      const { onChange, minDate, maxDate } = this.props;
      switch (type) {
      case 'button-toggler':
        this.props = {
          ...this.props,
          onChange: onChange ||  eventHandlers.handleSelectTogglerOpt
        };
        return ButtonToggler;
      case 'onboarding-button-toggler':
        this.props = {
          ...this.props,
          onChange: onChange ||  eventHandlers.handleSelectTogglerOpt
        };
        return OnboardingButtonToggler;
      case 'date':
        this.props = {
          ...this.props,
          minimumDate: minDate,
          maximumDate: maxDate,
          onChange: onChange || eventHandlers.handleSelectDate,
          onBlur: eventHandlers.handleInputBlur
        };
        return DateInput;
      case 'dropdown-select':
      case 'filter-dropdown-select':
        this.props = {
          ...this.props,
          onChange: onChange || eventHandlers.handleSelectDropdown,
        };
        return this.switchDropdownInputTypes(type);
      case 'checkbox':
        this.props = {
          ...this.props,
          onChange: onChange || eventHandlers.handleCheckBoxChange
        };
        return CheckBox;
      case 'tags':
        this.props = {
          ...this.props,
          handleDelete: onChange || eventHandlers.handleTagDeleted,
          handleAddition: onChange || eventHandlers.handleTagAdded,
          handleInputBlur: eventHandlers.handleTagAdded
        };
        return TagsInput;
      case 'multiple-choice-dropdown':
        this.props = {
          ...this.props,
          onChange: onChange || eventHandlers.handleInputChange,
          onBlur: eventHandlers.handleInputBlur
        };
        return MultipleChoiceDropdown;
      default:
        this.props = {
          ...this.props,
          onBlur: eventHandlers.handleInputBlur,
          onChange: onChange ||  eventHandlers.handleInputChange
        };
        return this.switchTextBasedInputTypes(type);
      }
    }

    switchTextBasedInputTypes(type) {
      switch (type) {
      case 'text':
      case 'password':
      case 'email':
        return HtmlInput;
      case 'number':
        return NumberInput;
      case 'textarea':
        return TextArea;
      }
    }

    switchDropdownInputTypes(type) {
      switch (type) {
      case 'filter-dropdown-select':
        return filterDropdownSelect;
      default:
        return DropdownSelect;
      }
    }

    labelNote(note) { // a small message tied to an inputs label
      return note ? (
        <span>
        &nbsp;
          { note }
        </span>
      ) : null;
    }


    renderAsterisk(){
      /* This API assumes that all inputs are required and therefore a red asterisk is displayed
         *  but this is not enforced with html
         * To remedy the former, if one has a field that should be optional,
         * they have to explicitly pass 'required: false' into customProps
         * This method checks for this and will display the asterisk appropriately.
         */

      const { required, labelNote } = this.props;
      let requiredInput = required === undefined ? true : required;
      return (
        <Fragment>
          {requiredInput && ( <span style={{color: 'red'}}> * </span> ) }
          {this.labelNote(labelNote)}
        </Fragment>
      );
    }

    render() {
      const { errors, values } = this.context;
      let { name, label, className } = this.props;
      const value = values ? values[name]: '';
      const error = errors ? errors[name]: '';
      let customClass = className ? className : '';
      // switch input types into InputElement
      const InputElement = this.getInputType();
      return (
        <div
          className={`form-input ${customClass} ${errors[name] ? 'error' : ''}`}>
          <label htmlFor={name}>
            {label}
            {this.renderAsterisk()}
          </label>
          <InputElement value={value} error={error} {...this.props} />
          <span className="error">
            {error}
          </span>
        </div>
      );
    }
}

Input.contextTypes = {
  errors: PropTypes.object.isRequired,
  values: PropTypes.object,
  targetForm: PropTypes.object.isRequired,
  validatorName: PropTypes.string
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.oneOfType([
    PropTypes.func, PropTypes.object
  ]),
  labelNote: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  labelNote: '',
  className: '',
  onChange: null
};

export default Input;
