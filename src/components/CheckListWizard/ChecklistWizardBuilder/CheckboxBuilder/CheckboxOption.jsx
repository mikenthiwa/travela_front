import React from 'react';
import PropTypes from 'prop-types';
import BuilderInput from '../BuilderOptions/BuilderInput';


const CheckboxOption = ({ order, updateBehaviour, name, optionId, deleteQuestion }) => {
  return (
    <div>
      <BuilderInput 
        deleteQuestion={deleteQuestion} 
        order={order} 
        name={name}
        optionId={optionId} 
        updateBehaviour={updateBehaviour} 
      />
    </div>
  );
};

CheckboxOption.defaultProps = {
  name: '',
  optionId: 0,
};

CheckboxOption.propTypes = {
  order: PropTypes.number.isRequired,
  optionId: PropTypes.number,
  name: PropTypes.string,
  deleteQuestion: PropTypes.func.isRequired,
  updateBehaviour: PropTypes.func.isRequired,
};

export default CheckboxOption;
