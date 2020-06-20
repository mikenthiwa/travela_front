import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import '../../views/Documents/Documents.scss';

class DeleteReasonModal extends Component {

  renderCancelButton(closeModal) {
    return (
      <button
        type="button"
        className="delete-checklist-item__footer--cancel"
        onClick={closeModal}>
            Cancel
      </button>
    );
  }

  renderDeleteReasonModal() {
    const { closeModal, shouldOpen,
      title, modalType, handleDelete,
      deleteReasonId, isDeleting } = this.props;
    return (
      <Modal
        closeModal={closeModal}
        customModalStyles="add-checklist-item delete-document"
        width="480px"
        visibility={
          shouldOpen && modalType === 'delete reason' ? 'visible' : 'invisible'
        }
        title={title}
      >
        <span className="delete-checklist-item__disclaimer restore-checklist-items_span">
          Are you sure you want to delete this travel reason
        </span>
        <div className="delete-checklist-item__hr delete-checklist-item__left" />
        <div className="delete-checklist-item__footer delete-checklist-item__right">
          {this.renderCancelButton(closeModal)}
          <button
            type="button"
            disabled={isDeleting}
            className={`bg-btn bg-btn--active ${
              isDeleting ? 'delete-document-button__disabled': 'delete-document-button'
            }`}
            onClick={() => {handleDelete(deleteReasonId);}}>
            {isDeleting?<i className="loading-icon" /> : ''}
            Delete
          </button>
        </div>
      </Modal>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderDeleteReasonModal()}
      </Fragment>
    );
  }
}

DeleteReasonModal.propTypes = {
  closeModal: PropTypes.func,
  handleDelete: PropTypes.func,
  shouldOpen: PropTypes.bool,
  isDeleting: PropTypes.bool,
  modalType: PropTypes.string,
  title: PropTypes.string,
  deleteReasonId: PropTypes.number
};

DeleteReasonModal.defaultProps = {
  closeModal: null,
  modalType: '',
  shouldOpen: false,
  title: '',
  handleDelete: () => {},
  deleteReasonId: '',
  isDeleting: false
};

export default DeleteReasonModal;
