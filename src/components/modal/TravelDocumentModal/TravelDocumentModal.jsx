import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Modal from '../Modal';
import OtherDocument from '../../Forms/TravelReadinessForm/OtherDocumentForm';


const TravelDocumentModal = (props) => {
  const {
    closeModal, shouldOpen, modalType,
    createTravelReadinessDocument,
    editTravelReadinessDocument,
    travelReadinessDocuments,
    openModal,
    fetchUserData, user,
    currentDocument, document, documentTypes
  } = props;
  const filteredDocumentTypes = documentTypes.filter(({ name }) => !['passport', 'visa'].includes(name))
    .map(({ name }) => name);
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
      <OtherDocument
        closeModal={closeModal}
        openModal={openModal}
        createTravelReadinessDocument={createTravelReadinessDocument}
        {...travelReadinessDocuments}
        documentType="other"
        fetchUserData={fetchUserData}
        user={user}
        editTravelReadinessDocument={editTravelReadinessDocument}
        currentDocument={currentDocument}
        modalType={modalType}
        document={document}
        documentTypes={filteredDocumentTypes}
      />
    </Modal>
  );
};
TravelDocumentModal.propTypes = {
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  createTravelReadinessDocument: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  travelReadinessDocuments: PropTypes.object.isRequired,
  fetchUserData: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,

  editTravelReadinessDocument: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
  currentDocument: PropTypes.object,
  documentTypes: PropTypes.array.isRequired,
};
TravelDocumentModal.defaultProps = {
  modalType: '',
  currentDocument: {}
};
export default TravelDocumentModal;
