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
  SelectChoiceDropdown,
  OnboardingButtonToggler,
} from './InputFields';
import createEventHandlersFor from '../formEventHandlers';
import './_input.scss';
import './InputFields/Date.scss';
import { RealFormContext } from '../FormContext/FormContext';

class Input extends PureComponent {

  newProps = {};

  getInputType() {
    let { name, type } = this.props;
    const { targetForm, validatorName } = this;
    // get event handlers for the form in this context, for its input named 'name'
    const eventHandlers = createEventHandlersFor(targetForm, name, validatorName);
    return this.switchTypeWithProps(type, eventHandlers);
  }

    switchTypeWithProps = (type, eventHandlers) => {
      const { onChange, minDate, maxDate } = this.props;
      switch (type) {
      case 'button-toggler':
        this.newProps = {
          ...this.props,
          onChange: onChange ||  eventHandlers.handleSelectTogglerOpt
        };
        return ButtonToggler;
      case 'onboarding-button-toggler':
        this.newProps = {
          ...this.props,
          onChange: onChange ||  eventHandlers.handleSelectTogglerOpt
        };
        return OnboardingButtonToggler;
      case 'date':
        this.newProps  = {
          ...this.props,
          minimumDate: minDate,
          maximumDate: maxDate,
          onChange: onChange || eventHandlers.handleSelectDate,
          onBlur: eventHandlers.handleInputBlur
        };
        return DateInput;
      case 'dropdown-select':
      case 'filter-dropdown-select':
        this.newProps= {
          ...this.props,
          onChange: onChange || eventHandlers.handleSelectDropdown,
        };
        return this.switchDropdownInputTypes(type);
      case 'checkbox':
        this.newProps = {
          ...this.props,
          onChange: onChange || eventHandlers.handleCheckBoxChange
        };
        return CheckBox;
      case 'tags':
        this.newProps = {
          ...this.props,
          handleDelete: onChange || eventHandlers.handleTagDeleted,
          handleAddition: onChange || eventHandlers.handleTagAdded,
          handleInputBlur: eventHandlers.handleTagAdded
        };
        return TagsInput;
      case 'multiple-choice-dropdown':
        this.newProps = {
          ...this.props,
          onChange: onChange || eventHandlers.handleInputChange,
          onBlur: eventHandlers.handleInputBlur
        };
        return MultipleChoiceDropdown;
      case 'select-choice-dropdown':
        this.newProps = {
          ...this.props,
          onChange: onChange || eventHandlers.handleInputChange,
          onBlur: eventHandlers.handleInputBlur
        };
        return SelectChoiceDropdown;
      default:
        this.newProps = {
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
      return (
        <RealFormContext.Consumer>
          {({ errors, values, targetForm, validatorName }) => {
            this.targetForm = targetForm;
            this.validatorName = validatorName;

            let { name, label, className } = this.props;
            const value = values ? values[name]: '';
            const error = errors ? errors[name]: '';
            let customClass = className ? className : '';
            // switch input types into InputElement
            const InputElement = this.getInputType();
            return (
              <div
                className={`form-input ${customClass} ${error ? 'error' : ''}`}>
                <label htmlFor={name}>
                  {label}
                  {this.renderAsterisk()}
                </label>
                <InputElement value={value} error={error} {...this.newProps} />
                <span className="error">
                  {error}
                </span>
              </div>
            );
          }}
        </RealFormContext.Consumer>
      );
    }
}

Input.contextTypes = {
  errors: PropTypes.object,
  values: PropTypes.object,
  targetForm: PropTypes.object,
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
