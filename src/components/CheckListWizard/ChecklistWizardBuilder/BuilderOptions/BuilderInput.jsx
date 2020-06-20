import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '../../Shared/deleteIcon';
import Helper from './helper';


const BuilderInput = ({updateBehaviour, optionId, deleteQuestion, name }) => (
  <div className="prompt-item">
    <input 
      id="option-name-input" 
      className="prompt-input" 
      type="text" 
      placeholder="Yes" 
      value={name}
      onKeyDown={Helper.disableInputUndoActions}
      onChange={(e) => updateBehaviour(e.target.value)} 
    />
    <DeleteIcon id="option-del-icon" onClick={() => deleteQuestion(optionId)} />
  </div>
);

BuilderInput.propTypes = {
  updateBehaviour: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  optionId: PropTypes.string.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
};

export default BuilderInput;
