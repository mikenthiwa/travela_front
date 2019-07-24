import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ options, prompt, handleCheckbox }) => {
  return (
    <div className="checkbox-option" key={options.id}>
      <label htmlFor="checkbox">
        <input 
          className="checkbox-input"
          type="checkbox" 
          onChange={handleCheckbox}
          name={`${prompt}-checkbox`} 
          value={options.name}
        />
        {options.name}
      </label>
    </div>
  );
};


Checkbox.propTypes = {
  prompt: PropTypes.string.isRequired,
  options: PropTypes.shape({id: PropTypes.number, name: PropTypes.string}).isRequired,
  handleCheckbox: PropTypes.func.isRequired,
};

export default Checkbox;
