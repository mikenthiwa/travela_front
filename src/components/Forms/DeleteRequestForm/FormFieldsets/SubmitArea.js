import React from 'react';
import {PropTypes} from 'prop-types';
import ButtonLoadingIcon from '../../ButtonLoadingIcon';

const SubmitArea = ({ onCancel, deleteChecklistItem, deleteReason, loading }) => {

  return (
    <fieldset>
      <div className="submit-area">
        <button type="button" className="bg-btn bg-btn--inactive" onClick={onCancel} id="cancel">
          Cancel
        </button>
        <button
          type="button"
          className="restore-checklist-items__footer--delete"
          id="oncancel" onClick={deleteChecklistItem}
          disabled={!deleteReason}
        >
          <ButtonLoadingIcon isLoading={loading} buttonText="Disable" />
        </button>
      </div>
    </fieldset>
  );
};

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  deleteChecklistItem: PropTypes.func.isRequired,
  deleteReason: PropTypes.string,
  loading: PropTypes.bool,
};
SubmitArea.defaultProps = {
  deleteReason: null,
  loading: false
};

export default SubmitArea;
