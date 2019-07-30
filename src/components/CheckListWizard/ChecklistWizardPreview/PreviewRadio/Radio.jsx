import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import radioIconUnchecked from '../../images/radio-unchecked.svg';
import radioIconChecked from '../../images/radio-checked.svg';

class Radio extends Component {
  componentDidUpdate(prevProps) {
    const { handleCheckName, option } = this.props;
    !isEqual(prevProps.option.behaviour, option.behaviour) && handleCheckName(option.id, option.behaviour);
  }

  render() {
    const { option, handleCheckName, checked } = this.props;
    return (
      <label className={`radio-cell ${checked ? 'selected' : ''}`} htmlFor={`radio-${option.id}`}>
        <input 
          className="radio-btn checklist-preview"
          type="radio"
          checked={checked}
          onChange={handleCheckName}
          id={`radio-${option.id}`} 
          value={option.name}
        />
        <div className="radio-icon">
          <img src={checked ? radioIconChecked : radioIconUnchecked} alt="radio icon" />
        </div>
        <span className="radio-value">{option.name}</span>
      </label>
    );
  }
}

Radio.propTypes = {
  option: PropTypes.object.isRequired,
  handleCheckName: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default Radio;
