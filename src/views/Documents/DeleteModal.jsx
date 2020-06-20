import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../components/modal/Modal';
import './Documents.scss';

class DeleteModal extends Component {

  renderDeleteModal() {
    const { closeModal, shouldOpen,
      title, modalType, handleDelete, documentName } = this.props;
    return (
      <Modal
        closeModal={closeModal}
        customModalStyles="add-checklist-item delete-document"
        width="480px"
        visibility={
          shouldOpen && modalType === 'delete document' ? 'visible' : 'invisible'
        }
        title={title}
      >
        <span className="delete-checklist-item__disclaimer restore-checklist-items_span">
          Are you sure you want to delete
          <strong>{documentName}</strong>
        </span>
        <div className="delete-checklist-item__hr delete-checklist-item__left" />
        <div className="delete-checklist-item__footer delete-checklist-item__right">
          <button
            type="button"
            className="delete-checklist-item__footer--cancel"
            onClick={closeModal}>
            Cancel
          </button>
          <button
            type="button"
            className="bg-btn bg-btn--active delete-document-button"
            onClick={handleDelete}>
            Delete
          </button>
        </div>
      </Modal>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderDeleteModal()}
      </Fragment>
    );
  }
}

const deleteModalPropTypes = {
  closeModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  documentName: PropTypes.string.isRequired,
};

DeleteModal.propTypes = { ...deleteModalPropTypes };

export default DeleteModal;
