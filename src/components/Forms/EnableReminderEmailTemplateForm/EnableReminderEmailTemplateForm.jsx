import React from 'react';
import { PropTypes } from 'prop-types';
import Modal from '../../modal/Modal';
import SubmitArea from './FormFieldsets/SubmitArea';


const EnableEmailReminderTemplateForm = ({
  closeModal, enableReminder, shouldOpen, modalType, isEnabling
}) => {
  return(
    <Modal
      closeModal={closeModal}
      customModalStyles="add-checklist-item delete-document"
      width="480px"
      visibility={
        shouldOpen && 
        modalType=== 'enable reminder template' 
        || modalType === 'enable disabled reminder' 
          ? 'visible' : 'invisible'
      }
      title="Enable Email Reminder Template"
    >
      <p className="delete-checklist-item__reason">Are you sure you want to enable the template?</p>
      <div className="delete-checklist-item__hr" />
      <SubmitArea
        onCancel={closeModal}
        hasBlankFields={false}
        isLoading={isEnabling}
        enableEmailReminderTemplate={enableReminder}
        send="Enable"
      />
    </Modal>
  );
};

EnableEmailReminderTemplateForm.propTypes = {
  enableReminder: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  shouldOpen: PropTypes.bool,
  isEnabling: PropTypes.bool
};

EnableEmailReminderTemplateForm.defaultProps = {
  modalType:'',
  shouldOpen: '',
  isEnabling: false,
};
export default EnableEmailReminderTemplateForm;
