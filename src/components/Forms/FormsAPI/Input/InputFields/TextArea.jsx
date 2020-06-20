import React from 'react';
import { PropTypes } from 'prop-types';

export const reasonsWarningColor = (length, max = -1, min = 0) =>{
  const charLeft = max === -1 ? length :  max - length;
  switch(true){
  case (length < min):
    return { color:'red', charLeft:  min ? `A minimum of ${min} characters is required` : charLeft};
  case (charLeft === 0):
    return { color:'red', charLeft: `You have reached a maximum of ${max} characters`};
  case (charLeft < 11):
    return {color:'red', charLeft };
  case (charLeft < 20):
    return {color:'#E67373', charLeft };
  default:
    return {color: '#3359db', charLeft};
  }
};

const TextArea = (props) => {
  let textAreaProps = {...props};
  let { error } = props;
  let className = error ? 'error' : '';
  const { maxLength, minLength, counter, value } = textAreaProps;
  const showCounter = maxLength || counter || minLength;
  const length = value ? value.length : 0;
  const counterInfo = reasonsWarningColor(length, maxLength, minLength);


  ['labelNote', 'toggleOptions', 'activeOption', 'selectedDate', 'error']
    .map(i => delete textAreaProps[i]); // onChange has been included in htmlProps

  return (
    <div className={`form-input__textarea ${error ? 'form-input__textarea--error': ''}`}>
      <textarea
        data-gramm_editor="false"
        rows="10"
        {...textAreaProps}
        className={`${className} textarea-box ${textAreaProps.className}`}
      />
      {
        showCounter && (
          <span
            style={{color: counterInfo.color }}
            className="form-input__textarea__character-counter"
          >
            {
              counterInfo.charLeft
            }
          </span>
        )
      }
    </div>
  );
};

TextArea.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
};

TextArea.defaultProps = {
  error: ''
};

export default TextArea;
