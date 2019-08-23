import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import './ConfirmSubmitModal.scss';

class ConfirmSubmitModal extends Component {

  render() {
    const { shouldOpen, modalType, closeModal, handleSubmitChecklist } = this.props;
    return (
      <Modal
        customModalStyles="modal--add-user"
        visibility={shouldOpen && modalType === 'CHECKLIST_SUBMISSION_MODAL' ? 'visible' : 'invisible'}
        title="Submit Checklist"
        width="480px"
        closeModal={closeModal}
      >
        <p className="delete-document-type-text">
          You cannot edit this checklist after submission
        </p>
        <div className="checklist-confirm-submission-button wrapper">
          <button 
            className="cancel-button-type"
            type="button"
            onClick={closeModal}
          >
            REVIEW CHECKLIST
          </button>
          <button 
            className="submit-button"
            type="button"
            onClick={handleSubmitChecklist}
          >
            SUBMIT
          </button>
        </div> 
      </Modal>
    );
  }
}

ConfirmSubmitModal.propTypes = {
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  handleSubmitChecklist: PropTypes.func.isRequired,
};

ConfirmSubmitModal.defaultProps = {
  modalType: '',
};

export default ConfirmSubmitModal;
