import React from 'react';
import PropTypes from 'prop-types';
import BuilderInput from '../BuilderOptions/BuilderInput';


const CheckboxOption = ({ option, updateBehaviour, deleteQuestion }) => {

  const onChangeBehaviour = value => {
    updateBehaviour({ ...option, name: value });
  };
  return (
    <div>
      <BuilderInput 
        deleteQuestion={deleteQuestion} 
        name={option.name}
        optionId={option.id} 
        updateBehaviour={onChangeBehaviour} 
      />
    </div>
  );
};

CheckboxOption.propTypes = {
  option: PropTypes.object.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  updateBehaviour: PropTypes.func.isRequired,
};

export default CheckboxOption;
