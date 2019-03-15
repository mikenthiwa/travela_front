import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import NewTravelReasonForm from '../Forms/NewTravelReasonForm';

const TravelReasonsModal = (
  { shouldOpen,
    closeModal,
    modalType,
    createNewTravelReason,
    editTravelReason,
    travelReason
  }
) => {
  const editing = /edit travel reasons/.test(modalType);
  return (
    <Modal
      customModalStyles="modal--add-user"
      visibility={shouldOpen && /(edit|create) travel reasons/.test(modalType) ? 'visible' : 'invisible'}
      title={`${editing ? 'Edit' : 'Add'} Travel Reason`}
      width="480px"
      closeModal={closeModal}
    >
      <NewTravelReasonForm
        onCancel={closeModal}
        hasBlankFields={false}
        closeModal={closeModal}
        editing={editing}
        send="Save"
        createNewTravelReason={createNewTravelReason}
        editTravelReason={editTravelReason}
        travelReason={travelReason}
      />
    </Modal>
  );
};

TravelReasonsModal.propTypes = {
  shouldOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  modalType: PropTypes.string,
  createNewTravelReason: PropTypes.func,
  editTravelReason: PropTypes.func,
  travelReason: PropTypes.object,
};

TravelReasonsModal.defaultProps = {
  closeModal: null,
  modalType: null,
  createNewTravelReason: null,
  editTravelReason: null,
  travelReason: {},
  shouldOpen: false
};

export default TravelReasonsModal;

