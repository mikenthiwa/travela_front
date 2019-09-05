import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../modal/Modal';
import AddVisaForm from '../../../Forms/TravelReadinessForm/AddVisaForm';

const VisaModal = ({
  closeModal, shouldOpen, modalType,
  createTravelReadinessDocument,
  editTravelReadinessDocument, travelReadinessDocuments,
  fetchUserData, user, document, fetchingDocument
}) => {
  return ( 
    <Modal
      customModalStyles="add-document-item"
      closeModal={closeModal}
      width="580px" height="600px"
      visibility={(shouldOpen && (modalType === 'add visa' || modalType === 'edit visa'))
        ? 'visible' : 'invisible'}
      title={modalType === 'add visa' ? 'Add Visa Details' : 'Edit Visa'}
    >
      <AddVisaForm
        closeModal={closeModal}
        createTravelReadinessDocument={createTravelReadinessDocument}
        editTravelReadinessDocument={editTravelReadinessDocument}
        documentType="visa" {...travelReadinessDocuments}
        fetchUserData={fetchUserData} user={user}
        document={document} modalType={modalType} fetchingDocument={fetchingDocument} />
    </Modal>
  );
};
 
export default VisaModal;
