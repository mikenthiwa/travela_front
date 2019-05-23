import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import './ConfirmDialog.scss';
import ButtonLoadingIcon from '../Forms/ButtonLoadingIcon';

class ConfirmDialog extends Component {

  renderModal = (id,renderDialogText, modalInvisible, closeDeleteModal,
    buttonSelected,handleApprove, handleReject, handleVerify, documentText, isConfirmDialogLoading) => {
    return(
      <Modal
        customModalStyles="delete-comment-modal"
        customOverlayStyle={
          `${renderDialogText(buttonSelected)}-modal-overlay`}
        visibility={modalInvisible ? 'invisible' : 'visible'}
        closeDeleteModal={closeDeleteModal}
        title={`${buttonSelected} ${documentText}?`}
        showOverlay={false}
      >
        <p className="approval-comment-modal__text">
          {`Confirm ${renderDialogText(buttonSelected)}`}
        </p>
        <button
          className={`${renderDialogText(buttonSelected)}-comment-modal__btn`}
          type="button"
          id={buttonSelected}
          disabled={isConfirmDialogLoading}
          onClick={
            (['Approve', 'Verify', 'approve'].includes(buttonSelected))
              ? () => handleApprove(id) || handleVerify(id) : () => handleReject(id)
          }
        >
          <ButtonLoadingIcon isLoading={isConfirmDialogLoading} buttonText={buttonSelected} />
        </button>
      </Modal>
    );
  };

  renderConfirmModal() {
    const {
      id,
      modalInvisible,
      buttonSelected,
      renderDialogText,
      closeDeleteModal,
      handleApprove,
      handleReject,
      handleVerify,
      documentText,
      isConfirmDialogLoading
    } = this.props;
    return (
      this.renderModal(id,renderDialogText, modalInvisible, closeDeleteModal,buttonSelected,
        handleApprove,handleReject,handleVerify, documentText, isConfirmDialogLoading)
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderConfirmModal()}
      </Fragment>
    );
  }
}

ConfirmDialog.propTypes = {
  id: PropTypes.string,
  modalInvisible: PropTypes.bool,
  buttonSelected: PropTypes.oneOfType([
    PropTypes.bool, PropTypes.string
  ]),
  handleVerify: PropTypes.func,
  renderDialogText: PropTypes.func.isRequired,
  closeDeleteModal: PropTypes.func.isRequired,
  handleApprove: PropTypes.func,
  handleReject: PropTypes.func.isRequired,
  documentText: PropTypes.string,
  isConfirmDialogLoading: PropTypes.bool
};

ConfirmDialog.defaultProps = {
  id: '',
  modalInvisible: true,
  buttonSelected: null,
  handleVerify: () => {},
  handleApprove: () => {},
  documentText: null,
  isConfirmDialogLoading: false
};

export default ConfirmDialog;
