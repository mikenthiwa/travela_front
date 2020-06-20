import React from 'react';
import PropTypes from 'prop-types';
import PersonalDetailsFieldset from '../FormFieldsets/PersonalDetails';

const savePersonalDetails = personalDetails => {
  Object.keys(personalDetails).forEach(key => {
    localStorage.setItem(key, personalDetails[key]);
  });
};

function _changeState (InputState, ErrorMessageState, errorMessage, value) {
  const { occupations, managers } = this.props;
  this.setState((prevState) => {
    const newState = { ...prevState.values, ...InputState };
    return { ...prevState, values: { ...newState } };
  });
  const suggestionChoices = 'manager' in InputState ? managers.map(manager => manager.fullName) :
    occupations.map(occupation => occupation.occupationName);
  // if typed manager is not in the database return error
  if (suggestionChoices.indexOf(value) === -1) {
    return this.setState((prevState) => {
      const newError = {
        ...prevState.errors,
        ...errorMessage
      };
      return { ...prevState, errors: { ...newError } };
    });
  }
  // clear out error message
  return this.setState((prevState) => {
    const newError = { ...prevState.errors, ...ErrorMessageState };
    return { ...prevState, errors: { ...newError } };
  });
}

function _onChangeAutoSuggestion (type, value) {
  const changeState = _changeState.bind(this);
  let errorMessage = { manager: ' No manager with the name exists' };
  const managerInputState = { 'manager': value };
  const managerErrorMessageState = { 'manager': '' };
  const occupationErrorMessageState = { 'role': '' };
  let occupationInputState = { 'role': value };
  if (type === 'manager') {
    changeState(managerInputState, managerErrorMessageState, errorMessage, value);
  }
  errorMessage = { role: ' No role with the name exists' };
  if (type === 'role') {
    changeState(occupationInputState, occupationErrorMessageState, errorMessage, value);
  }
}

function renderPersonalDetailsFieldset (props, _this) {
  const { state, nextStep, collapsible } = _this;
  const { collapse, title, position, line, values, errors } = state;
  const { managers, occupations, creatingRequest } = props;
  const onChangeAutoSuggestion = (() => _onChangeAutoSuggestion.bind(_this))();


  return (
    <PersonalDetailsFieldset
      values={values}
      savePersonalDetails={savePersonalDetails}
      onChangeAutoSuggestion={onChangeAutoSuggestion}
      collapsible={collapsible}
      collapse={collapse}
      title={title}
      position={position}
      line={line}
      managers={managers}
      occupations={occupations}
      value="100%"
      hasBlankFields={
        !!errors.manager	
      }
      loading={creatingRequest}
      send="Next"
      completePersonalDetails={nextStep}
    />
  );
}

function _renderPersonalDetailsFieldset () {
  this.onChangeAutoSuggestion = _onChangeAutoSuggestion.bind(this);
  return renderPersonalDetailsFieldset(this.props, this);
}

renderPersonalDetailsFieldset.propTypes = {
  managers: PropTypes.array,
  occupations: PropTypes.array,
  creatingRequest: PropTypes.bool,
};

renderPersonalDetailsFieldset.defaultProps = {
  creatingRequest: false,
  managers: [],
  occupations: [], 
};

export default _renderPersonalDetailsFieldset;
