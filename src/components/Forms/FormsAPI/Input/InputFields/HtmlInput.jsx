import React from 'react';
import {PropTypes} from 'prop-types';

// good for types like text, email, passord 
const HtmlInput = ({...props, value = ''}) => {
  let htmlProps = {...props, value};
  let { error } = props;
  let className = error? 'error': '';
  ['labelNote', 'toggleOptions', 'activeOption', 'selectedDate', 'error']
    .map(i => delete htmlProps[i]); // onChange has been included in htmlProps

  return (
    <input
      {...htmlProps}
      className={`${className} ${htmlProps.className}`}
    />
  );
};

HtmlInput.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

HtmlInput.defaultProps = {
  error: ''
};

HtmlInput.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
};

export default HtmlInput;
