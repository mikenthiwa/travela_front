import React from 'react';
import { PropTypes } from 'prop-types';
import ButtonLoadingIcon from '../../ButtonLoadingIcon';

const SubmitArea = ({ onCancel, hasBlankFields, travelReason, send }) => {
  const { isCreating, isEditing } = travelReason;
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
          disabled={hasBlankFields || isCreating || isEditing}
        >
          <ButtonLoadingIcon isLoading={isCreating || isEditing} buttonText={send} />
        </button>
      </div>
    </fieldset>
  );
};

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  hasBlankFields: PropTypes.bool.isRequired,
  travelReason: PropTypes.object,
  send: PropTypes.string
};

SubmitArea.defaultProps = {
  travelReason: {},
  send: 'Add Reason'
};

export default SubmitArea;
