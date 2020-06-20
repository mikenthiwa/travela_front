import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import Preloader from '../Preloader/Preloader';

class DeleteDocumentTypesModal extends Component {

  render() {
    const { shouldOpen, modalType, closeModal, deleteDocumentTypes, isLoading } = this.props;
    return (
      <Modal
        customModalStyles="modal--add-user"
        visibility={shouldOpen && modalType === 'DELETE_DOCUMENT_TYPE' ? 'visible' : 'invisible'}
        title="Delete Document Type"
        width="480px"
        closeModal={closeModal}
      >
        <p className="delete-document-type-text">Are you sure you want to delete this document type</p>
        <div className="document-type-delete-button wrapper">
          <button 
            className="cancel-button-type"
            type="button"
            onClick={closeModal}
          >
            CANCEL
          </button>
          <button 
            className="delete-button"
            type="button"
            onClick={deleteDocumentTypes}
            disabled={isLoading}
          >
            DELETE
            {isLoading && <Preloader />}
          </button>
        </div> 
      </Modal>
    );
  }
}

DeleteDocumentTypesModal.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  deleteDocumentTypes: PropTypes.func.isRequired,
};

DeleteDocumentTypesModal.defaultProps = {
  modalType: '',
};

export default DeleteDocumentTypesModal;
