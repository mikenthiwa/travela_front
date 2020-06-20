import React from 'react';
import {PropTypes} from 'prop-types';


const ButtonToggler = (props) => {
  const {value, onChange, choices, name, className, disabled} = props;

  const choiceButtons = choices
    .map(choice => {
      const status = (choice.value || choice) === value? 'active': 'inactive';
      return (
        <button
          key={choice.value || choice}
          name={name}
          onClick={(e) => {onChange(e.target.value ||
          e.target.getAttribute('data-value') ||
          e.target.dataset.value);}}
          data-value={choice.value || choice}
          type="button"
          className={`bg-btn bg-btn--${status}`}
          disabled={disabled}
        >
          {choice.label || choice}
        </button>
      );
    });

  return (
    <div className={`input ${className}`}>
      {choiceButtons}
    </div>
  );
};

ButtonToggler.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool

};

ButtonToggler.defaultProps = {
  className: '',
  disabled: false
};

export default ButtonToggler;
