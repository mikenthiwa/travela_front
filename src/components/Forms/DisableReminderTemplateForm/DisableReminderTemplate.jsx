import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Modal from '../../modal/Modal';
import SubmitArea from './FormFieldsets/SubmitArea';
import './DisableReminderTemplate.scss';


const renderHeader = (modalType) => {
  return modalType === 'disable reminder template' 
    ? 'Disable Reminder Template' 
    : 'Disable Reminder Condition';
};

const checkModalVisibility = (shouldOpen, modalType) => {
  return shouldOpen &&
        (modalType.match('disable reminder template') || modalType.match('disable reminder condtion'))
    ? 'visible' : 'invisible';
};

const renderTextArea = (conditionReason, handleInputChange) => {
  return (
    <Fragment>
      <textarea
        type="text"
        defaultValue={conditionReason}
        disabled={conditionReason ? true:false}
        className={
          conditionReason 
            ? 'delete-checklist-item__input disabled'
            :'delete-checklist-item__input'}
        onChange={handleInputChange}
      />
    </Fragment>
  );
};

const renderSubmitArea = (
  closeModal,
  disableReminderTemplate,
  disableEmailReminder,
  disableReason, 
  conditionReason,
  mode,
  modalType,
  isDisabling,
) => {
  return (
    <Fragment>
      <SubmitArea
        onCancel={closeModal}
        hasBlankFields={false}
        modalType={modalType}
        isDisabling={isDisabling}
        disableReminderTemplate={disableReminderTemplate}
        disableEmailReminder={disableEmailReminder}
        disableReason={disableReason}
        send="Disable"
        conditionReason={conditionReason}
        mode={mode}
      />
    </Fragment>
  );
};

export const FormBody = ({
  check ,
  handleInputChange, 
  mode,
  isDisabling,
  disableReason,
  disableEmailReminder,
  modalType,
  closeModal, 
  disableReminderTemplate
}) => (
  <span>
    { check ?
      <p className="delete-checklist-item__reason" />
      : <p className="delete-checklist-item__reason">Reason for Disabling</p>
    }
    { renderTextArea(check, handleInputChange) }
    <div className="delete-checklist-item__hr" />
    { renderSubmitArea(
      closeModal, 
      disableReminderTemplate, 
      disableEmailReminder, 
      disableReason, 
      check,
      mode, 
      modalType,
      isDisabling
    ) }
  </span>
);

const DisableReminderTemplateForm = ({
  closeModal, disableEmailReminder, disableReminderTemplate,
  shouldOpen, modalType, handleInputChange, isDisabling,
  disableReason, conditionReason, templateReason
}) => {
  const check = conditionReason || templateReason;
  const mode = check ? 'view' : 'add';
  return(
    <Modal
      closeModal={closeModal}
      customModalStyles={templateReason 
        ? 'delete-checklist-item__disable'
        : 'delete-checklist-item'}
      visibility={checkModalVisibility(shouldOpen,modalType)}
      title={check ? 'Disable Reason': renderHeader(disableReminderTemplate)}
    >
      <FormBody
        check={check}
        isDisabling={isDisabling}
        handleInputChange={handleInputChange}
        mode={mode}
        disableReason={disableReason}
        disableEmailReminder={disableEmailReminder}
        closeModal={closeModal}
        disableReminderTemplate={disableReminderTemplate}
        modalType={modalType}
      />
    </Modal>
  );
};

FormBody.propTypes = {
  check: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  disableEmailReminder: PropTypes.func.isRequired,
  disableReminderTemplate: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  disableReason: PropTypes.string,
  mode: PropTypes.string,
  modalType: PropTypes.string,
  isDisabling: PropTypes.bool
};

DisableReminderTemplateForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  disableEmailReminder: PropTypes.func,
  disableReminderTemplate: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  disableReason: PropTypes.string,
  conditionReason: PropTypes.string,
  templateReason: PropTypes.string,
  shouldOpen: PropTypes.bool.isRequired,
  isDisabling: PropTypes.bool,
};

FormBody.defaultProps = {
  modalType:'',
  disableReason: '',
  conditionReason:'',
  templateReason: '',
  mode: '',
  isDisabling: false
};

DisableReminderTemplateForm.defaultProps = {
  modalType:'',
  disableReason: '',
  conditionReason:'',
  templateReason: '',
  disableEmailReminder: () => {},
  disableReminderTemplate: () => {},
  isDisabling: false,
};
export default DisableReminderTemplateForm;
