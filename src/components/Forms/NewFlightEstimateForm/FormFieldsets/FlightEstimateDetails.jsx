import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import formMetadata from '../../FormsMetadata/NewFlightEstimateFormMetadata';

class FlightEstimateFieldset extends Component {
  renderfields = () => {
    const {
      editing,
      handleShowEventError,
      isValidAmount,
      onChangeAmountInput,
      isEmpty,
      options,
    } = this.props;

    const { renderInput } = this.inputRenderer;
    const determineType = editing ? 'text' : 'multiple-choice-dropdown';
    const required = editing ? false : true;
    return (
      <div>
        <div>
          <div className="input-group mdl-grid">
            <div className="spaces mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
              {renderInput('origin', `${determineType}`, {
                size: '',
                readOnly: editing,
                options: options,
                required: required
              })}
            </div>
            <div className="spaces mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
              {renderInput('destination', `${determineType}`, {
                size: '',
                readOnly: editing,
                options: options,
                required: required
              })}
            </div>
            <div className="spaces mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
              {renderInput('flightEstimate', 'number', {
                size: '',
                min: '1',
                max: '5000',
                onChange: event => onChangeAmountInput(event),
                onInvalid: event => handleShowEventError(event),
                placeholder: '5000',
                className: `request{ uniq }dropdown estimate-amount ${
                  isValidAmount || isEmpty ? '' : 'input-border-error'
                }`,
                id: 'your-manager'
              })}
              {
                <span
                  className={`${
                    isValidAmount || isEmpty ? 'hide-error' : 'show-error'
                  }`}
                >
                  Amount should be a positive integer and not more than 5000
                </span>
              }
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    const labels = formMetadata;
    this.inputRenderer = new InputRenderer(labels);
    return (
      <fieldset className="personal-details">{this.renderfields()}</fieldset>
    );
  }
}

FlightEstimateFieldset.propTypes = {
  handleShowEventError: PropTypes.func,
  isValidAmount: PropTypes.bool,
  onChangeAmountInput: PropTypes.func,
  isEmpty: PropTypes.bool,
  editing: PropTypes.bool,
  options: PropTypes.array.isRequired,
};

FlightEstimateFieldset.defaultProps = {
  handleShowEventError: () => {},
  isValidAmount: true,
  isEmpty: true,
  onChangeAmountInput: () => {},
  editing: false
};

export default FlightEstimateFieldset;
