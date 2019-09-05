import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../modal/Modal';
import OtherDocumentForm from '../../../Forms/TravelReadinessForm/OtherDocumentForm';

const OtherDocsModal = ({
  user,
  openModal,
  closeModal,
  createTravelReadinessDocument,
  travelReadinessDocuments,
  fetchUserData,
  editTravelReadinessDocument,
  modalType,
  documentTypes,
  document,
  shouldOpen,
}) => {
  return ( 
    <Modal
      customModalStyles="add-document-item"
      closeModal={closeModal}
      width="580px"
      height="600px"
      visibility={(shouldOpen && (modalType === 'add other' || modalType === 'edit other'))
        ? 'visible' : 'invisible'
      }
      title={modalType === 'add other' ? 'Add Document' : 'Edit Document'}
    >
      <OtherDocumentForm
        openModal={openModal}
        closeModal={closeModal}
        createTravelReadinessDocument={createTravelReadinessDocument}
        {...travelReadinessDocuments}
        documentType="other"
        fetchUserData={fetchUserData}
        user={user}
        editTravelReadinessDocument={editTravelReadinessDocument}
        currentDocument={{}}
        modalType={modalType}
        document={document}
        documentTypes={documentTypes}
      />
    </Modal>
  );
};
 
export default OtherDocsModal;
