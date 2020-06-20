import React from 'react';
import {PropTypes} from 'prop-types';
import ButtonLoadingIcon from '../../ButtonLoadingIcon';

const SubmitArea = ({
  onCancel, disableEmailReminder,
  modalType, isDisabling,
  disableReminderTemplate, disableReason, mode }) => {

  return (
    <fieldset>
      <div className="submit-area">
        <button type="button" className="bg-btn bg-btn--inactive" onClick={onCancel} id="cancel">
          Cancel
        </button>
        {
          mode === 'add' ?
            (
              <button
                type="button"
                className="restore-checklist-items__footer--delete"
                id="oncancel"
                onClick={
                  modalType === 'disable reminder template' 
                    ? disableReminderTemplate 
                    : disableEmailReminder}
                disabled={!disableReason}
              >
                <ButtonLoadingIcon isLoading={isDisabling} buttonText="Disable" />
              </button>
            )
            : ''
        }
      </div>
    </fieldset>
  );
};

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  isDisabling: PropTypes.bool,
  disableEmailReminder: PropTypes.func.isRequired,
  disableReminderTemplate: PropTypes.func.isRequired,
  disableReason: PropTypes.string,
  mode: PropTypes.string,
  modalType: PropTypes.string,
};
SubmitArea.defaultProps = {
  disableReason: null,
  mode: '',
  modalType: '',
  isDisabling: false,
};

export default SubmitArea;
