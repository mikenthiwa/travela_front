import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ options, prompt, handleCheckbox }) => {
  return (
    <div className="checkbox-option" key={options.id}>
      <label htmlFor={options.id}>
        <input 
          className="checkbox-input"
          type="checkbox"
          id={options.id}
          onChange={handleCheckbox}
          name={`${prompt}-checkbox`} 
          value={options.name}
        />
        <div className="fancy-checkbox" />
        {options.name}
      </label>
    </div>
  );
};


Checkbox.propTypes = {
  prompt: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
};

export default Checkbox;
