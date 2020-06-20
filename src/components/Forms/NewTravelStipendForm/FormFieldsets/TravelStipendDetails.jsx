import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'lodash';
import InputRenderer from '../../FormsAPI';
import formMetadata from '../../FormsMetadata/NewTravelStipendFormMetadata';

class TravelStipendFieldset extends Component {

  renderfields = () => {
    const {
      centers,
      editing,
      handleShowEventError, isValidAmount,
      onChangeAmountInput,
      isEmpty,
      values,
      getCountryChoices
    } = this.props;
    
    const { renderInput } = this.inputRenderer;
    return (
      <div>
        <div>
          <div className="input-group mdl-grid">
            <div className="spaces mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
              {
                renderInput('center', 'filter-dropdown-select', {
                  choices: uniq(getCountryChoices()),
                  size: '',
                  className: 'request{ uniq }dropdown stipend-location',
                  readOnly: !!editing
                })
              }
            </div>
            <div className="spaces mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
              {renderInput('stipend', 'number', {
                size: '',
                min: '1',
                max: '1000',
                onChange: (event) => onChangeAmountInput(event),
                onInvalid: (event) => handleShowEventError(event),
                placeholder: '1000',
                className: `request{ uniq }dropdown stipend-amount ${isValidAmount
                  || isEmpty ? '' : 'input-border-error'}`,
                id: 'your-manager',
              })}
              {
                <span
                  className={`${isValidAmount
                    || isEmpty ? 'hide-error': 'show-error'}`}
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
      <fieldset className="personal-details">
        {this.renderfields()}
      </fieldset>
    );
  }
}


TravelStipendFieldset.propTypes = {
  centers: PropTypes.array,
  handleShowEventError: PropTypes.func,
  isValidAmount: PropTypes.bool,
  onChangeAmountInput: PropTypes.func,
  isEmpty: PropTypes.bool,
  editing: PropTypes.bool,
  values: PropTypes.object,
  getCountryChoices: PropTypes.func.isRequired
};

TravelStipendFieldset.defaultProps = {
  centers: [],
  handleShowEventError: () => {},
  isValidAmount: true,
  isEmpty: true,
  onChangeAmountInput: () => {},
  editing: false,
  values: {}
};

export default TravelStipendFieldset;
