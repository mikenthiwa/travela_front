import React from 'react';
import {PropTypes} from 'prop-types';
import dropDown from  '../../../../../images/icons/form_select_dropdown.svg';

// HTML input

const NumberInput = (props) => {
  let NumberProps = {...props};
  let { error } = props;
  let className = error? 'error': '';

  ['labelNote', 'toggleOptions', 'activeOption', 'selectedDate', 'error']
    .map(i => delete NumberProps[i]); // onChange has been included in htmlProps

  return (
    <div>
      <input
        min="1"
        {...NumberProps}
        className={`${className} ${NumberProps.className}`}
      />
      <div className="style-number">
        <img src={dropDown} alt="icn" className="image1" />
        <img src={dropDown} alt="icn" className="image2" />
      </div>
    </div>
  );
};

NumberInput.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
};

NumberInput.defaultProps = {
  error: ''
};

export default NumberInput;
