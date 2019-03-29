import React from 'react';
import { PropTypes } from 'prop-types';
import error from '../../../images/error.svg';
import Modal from '../../modal/Modal';
import SubmitArea from './FormFieldsets/SubmitArea';


const DeleteRequestForm = ({ 
  closeModal, deleteChecklistItem, itemName, 
  shouldOpen, modalType, handleInputChange,
  deleteReason, deletingChecklist
}) => {
  return(
    <Modal
      closeModal={closeModal}
      customModalStyles="delete-checklist-item"
      visibility={
        shouldOpen && modalType.match('delete checklist item') ? 'visible' : 'invisible'
      }
      title="Disable Checklist Item"
    >
      <p className="delete-checklist-item__reason">Reason for Disabling</p>
      <textarea type="text" className="delete-checklist-item__input" onChange={handleInputChange} />
      <span className="delete-checklist-item__disclaimer">
        <img src={error} alt="profile" className="delete-checklist-item__disclaimer--error" />
        <strong>{ itemName }</strong>
          will be removed from guest travel checklist
      </span>
      <div className="delete-checklist-item__hr checklist-hr" />
      <SubmitArea
        loading={deletingChecklist}
        onCancel={closeModal}
        hasBlankFields={false}
        deleteChecklistItem={deleteChecklistItem}
        deleteReason={deleteReason}
        send={
          modalType === 'delete checklist item' ? 'Disable' : 'Send Request'
        }
      />
    </Modal>
  );
};

DeleteRequestForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  deleteChecklistItem: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  deleteReason: PropTypes.string,
  shouldOpen: PropTypes.bool.isRequired,
  itemName: PropTypes.string,
  deletingChecklist: PropTypes.bool,
};

DeleteRequestForm.defaultProps = {
  modalType:'',
  deleteReason: '',
  itemName: '',
  deletingChecklist: false
};
export default DeleteRequestForm;
