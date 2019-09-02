import React from 'react';
import { PropTypes } from 'prop-types';
import ButtonLoadingIcon from '../../ButtonLoadingIcon';

const SubmitArea = ({ onCancel, hasBlankFields, department, send }) => {
  const { isCreatingDepartment, isEditingDepartment } = department;

  return (
    <fieldset>
      <div className="submit-area delete-checklist-item__right">
        <button
          type="button"
          className="bg-btn bg-btn--inactive"
          onClick={onCancel} id="cancel">
          Cancel
        </button>
        <button
          type="submit"
          className="bg-btn bg-btn--active"
          disabled={hasBlankFields || isCreatingDepartment || isEditingDepartment}
        >
          <ButtonLoadingIcon isLoading={isCreatingDepartment || isEditingDepartment} buttonText={send} />
        </button>
      </div>
    </fieldset>
  );
};

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  hasBlankFields: PropTypes.bool.isRequired,
  department: PropTypes.object,
  send: PropTypes.string
};

SubmitArea.defaultProps = {
  department: {},
  send: 'Add Reason'
};

export default SubmitArea;
