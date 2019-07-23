import React from 'react';
import {PropTypes} from 'prop-types';

const OnboardingButtonToggler = (props) => {
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
          className={`bg-btn bg-onboarding--${status}`}
          disabled={disabled}
        >
          {choice.label || choice}
          {status === 'active' ? <i className="fa fa-check-circle" />: null}
        </button>
      );
    });

  return (
    <div className={`input ${className}`}>
      {choiceButtons}
    </div>
  );
};

OnboardingButtonToggler.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool

};

OnboardingButtonToggler.defaultProps = {
  className: '',
  disabled: false
};

export default OnboardingButtonToggler;
