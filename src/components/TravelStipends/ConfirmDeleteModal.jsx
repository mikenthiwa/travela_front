import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import SubmitArea from './FormFieldSets/SubmitArea';


class ConfirmDeleteModal extends Component {

  onCancel = (event) => {
    event.preventDefault();
    const { closeModal } = this.props;
    closeModal();
  };

  onSend = (event) => {
    const { selectedStipend: {id}, deleteTravelStipend }=this.props;
    event.preventDefault();
    deleteTravelStipend(id);
  };


  render = () => {
    const { closeModal, modalType, shouldOpen,
      isDeleting, selectedStipend: { country } } = this.props;
    return (
      <div>
        <Modal
          customModalStyles="delete-stipend"
          closeModal={closeModal}
          width="504px"
          visibility={
            shouldOpen && modalType === 'Delete Stipend'
              ? 'visible'
              : 'invisible'
          }
          title="Confirm Delete"
        >
          <div className="content">
            <p>
              {'Are you sure you want to delete stipend for '}
              { country }
              ?
            </p>
          </div>
          <hr />
          <SubmitArea
            onCancel={this.onCancel}
            onSend={this.onSend}
            send="Delete"
            loading={isDeleting}
          />
        </Modal>
      </div>
    );
  };
}

ConfirmDeleteModal.propTypes = {
  closeModal: PropTypes.func,
  selectedStipend: PropTypes.object,
  modalType: PropTypes.string,
  shouldOpen: PropTypes.bool,
  isDeleting: PropTypes.bool,
  deleteTravelStipend: PropTypes.func.isRequired,
};

ConfirmDeleteModal.defaultProps = {
  modalType: '',
  closeModal: () => {},
  shouldOpen: false,
  selectedStipend: {},
  isDeleting:false
};

export default ConfirmDeleteModal;
