import React from 'react';
import PropTypes from 'prop-types';

// skip to another question behaviour
const SkipToAnotherQuestion = ({ handleSkipToQuestion, payload}) => (
  <button type="button" className="skipQuestion" onClick={() => handleSkipToQuestion(Number(payload))}>
    {`Skip to Question ${payload}`}
  </button>
);


SkipToAnotherQuestion.propTypes = {
  payload: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleSkipToQuestion: PropTypes.func.isRequired
};

export default SkipToAnotherQuestion;
