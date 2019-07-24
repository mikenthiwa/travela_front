import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '../../Shared/deleteIcon';

const BuilderInput = ({updateBehaviour, order, optionId, deleteQuestion, name}) => (
  <div className="prompt-item">
    <input 
      id="option-name-input" 
      className="prompt-input" 
      type="text" 
      placeholder="Yes" 
      value={name} 
      onChange={(e) => updateBehaviour(e.target.value, order, optionId, 'name')} 
    />
    <DeleteIcon id="option-del-icon" onClick={() => deleteQuestion(order, optionId)} />
  </div>
);

BuilderInput.propTypes = {
  updateBehaviour: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  optionId: PropTypes.number.isRequired,
  deleteQuestion: PropTypes.func.isRequired
};

export default BuilderInput;
