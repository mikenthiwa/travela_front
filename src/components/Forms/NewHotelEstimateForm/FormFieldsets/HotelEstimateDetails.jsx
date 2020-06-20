import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'lodash';
import InputRenderer from '../../FormsAPI';
import formMetadata from '../../FormsMetadata/NewHotelEstimateFormMetadata';

class HotelEstimateFieldset extends Component {
  renderfields = () => {
    const {
      getCountryChoices,
      editing,
      handleShowEventError,
      isValidAmount,
      onChangeAmountInput,
      isEmpty,
      regionfield
    } = this.props;

    const { renderInput } = this.inputRenderer;
    return (
      <div>
        <div>
          <div className="input-group mdl-grid">
            <div className="spaces mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
              {renderInput(`${regionfield[0]}`, `${regionfield[1]}`, {
                choices: uniq(getCountryChoices()),
                size: '',
                className: 'request{ uniq }dropdown estimate-location',
                readOnly: !!editing
              })}
            </div>
            <div className="spaces mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
              {renderInput('estimate', 'number', {
                size: '',
                min: '1',
                max: '1000',
                onChange: event => onChangeAmountInput(event),
                onInvalid: event => handleShowEventError(event),
                placeholder: '1000',
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
                  Amount should be a positive integer and not more than 1000
                </span>
              }
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    const { editing } = this.props;
    const labels = formMetadata(editing);
    this.inputRenderer = new InputRenderer(labels);

    return (
      <fieldset className="personal-details">{this.renderfields()}</fieldset>
    );
  }
}

HotelEstimateFieldset.propTypes = {
  handleShowEventError: PropTypes.func,
  isValidAmount: PropTypes.bool,
  onChangeAmountInput: PropTypes.func,
  isEmpty: PropTypes.bool,
  editing: PropTypes.bool,
  regionfield: PropTypes.array.isRequired,
  getCountryChoices: PropTypes.func.isRequired
};

HotelEstimateFieldset.defaultProps = {
  handleShowEventError: () => {},
  isValidAmount: true,
  isEmpty: true,
  onChangeAmountInput: () => {},
  editing: false
};

export default HotelEstimateFieldset;
