import React from 'react';
import PropTypes from 'prop-types';

// skip to another question behaviour
const SkipToAnotherQuestion = ({ handleSkipToQuestion, behaviour}) => (
  <button type="button" className="skipQuestion" onClick={() => handleSkipToQuestion(Number(behaviour.payload))}>
    {`Question ${behaviour.payload} is not applicable`}
  </button>
);


SkipToAnotherQuestion.propTypes = {
  behaviour: PropTypes.object.isRequired,
  handleSkipToQuestion: PropTypes.func.isRequired
};

export default SkipToAnotherQuestion;
