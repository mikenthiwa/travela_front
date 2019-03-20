import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import formMetadata from '../../FormsMetadata/NewTravelStipendFormMetadata';

class TravelStipendFieldset extends Component {

  renderfields = () => {
    const { 
      centers, 
      handleShowEventError, isValidAmount, 
      onChangeAmountInput, 
      isEmpty,
    } = this.props;
    const centerChoices = centers.map(center => center.location);
    const { renderInput } = this.inputRenderer;
    return (
      <div>
        <div>
          <div className="input-group">
            <div className="spaces">
              {
                renderInput('center', 'dropdown-select', {
                  choices: centerChoices,
                  size: '',
                  className: 'request_dropdown stipend-location',
                  id: 'user-location'
                })
              }
            </div>
            <div className="spaces">
              {renderInput('stipend', 'number', {
                size: '',
                min: '1',
                max: '1000',
                onChange: (event) => onChangeAmountInput(event),
                onInvalid: (event) => handleShowEventError(event),
                placeholder: '1000',
                className: `request_dropdown stipend-amount ${isValidAmount
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
  editing: PropTypes.bool
};

TravelStipendFieldset.defaultProps = {
  centers: [],
  handleShowEventError: () => {},
  isValidAmount: true,
  isEmpty: true,
  onChangeAmountInput: () => {},
  editing: false
};

export default TravelStipendFieldset;
