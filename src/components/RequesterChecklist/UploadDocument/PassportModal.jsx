import React from 'react';
import Modal from '../../modal/Modal';
import PassportForm from '../../Forms/TravelReadinessForm/PassportForm';

const PassportModal = ({
  closeModal, shouldOpen,
  modalType, travelReadinessDocuments, showPassportForm,
  createTravelReadinessDocument, editTravelReadinessDocument,
  fetchUserData, user, document, fetchingDocument, scanPassport, passportInfo, retrieving
}) => {
  return ( 
    <Modal
      customModalStyles="add-document-item"
      closeModal={closeModal} width="680px"
      visibility={(shouldOpen && (modalType === 'add passport' || modalType === 'edit passport'))
        ? 'visible' : 'invisible'}
      title={modalType === 'add passport' ? 'Add Passport Details' : 'Edit Passport Details'}
    >
      <PassportForm
        createTravelReadinessDocument={createTravelReadinessDocument}
        editTravelReadinessDocument={editTravelReadinessDocument}
        scanPassport={scanPassport}
        {...travelReadinessDocuments} fetchUserData={fetchUserData}
        closeModal={closeModal} user={user} showPassportForm={showPassportForm}
        document={document} modalType={modalType} fetchingDocument={fetchingDocument}
        passportInfo={passportInfo} retrieving={retrieving}
      />
    </Modal>
  );
};
 
export default PassportModal;
