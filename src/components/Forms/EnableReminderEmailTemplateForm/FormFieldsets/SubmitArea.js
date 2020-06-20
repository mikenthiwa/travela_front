import React from 'react';
import {PropTypes} from 'prop-types';
import ButtonLoadingIcon from '../../ButtonLoadingIcon';


const SubmitArea = ({ onCancel, enableEmailReminderTemplate, isLoading }) => {

  return (
    <fieldset>
      <div className="submit-area delete-checklist-item__right">
        <button type="button" className="bg-btn bg-btn--inactive" onClick={onCancel} id="cancel">
          Cancel
        </button>
        <button 
          type="button"
          className="bg-btn bg-btn--active"
          id="oncancel" onClick={enableEmailReminderTemplate}
        >
          <ButtonLoadingIcon isLoading={isLoading} buttonText="Enable" />
        </button>
      </div>
    </fieldset>
  );
};

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  enableEmailReminderTemplate: PropTypes.func.isRequired,
};

SubmitArea.defaultProps = {
  isLoading: false,
};

export default SubmitArea;
