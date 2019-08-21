import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { closeModal, openModal } from '../../../redux/actionCreator/modalActions';
import { createTravelReadinessDocument, scanPassport } from '../../../redux/actionCreator/travelReadinessActions';
import {
  fetchUserReadinessDocuments, editTravelReadinessDocument, deleteTravelReadinessDocument, fetchTravelReadinessDocument
} from '../../../redux/actionCreator/travelReadinessDocumentsActions';
import { fetchDocumentTypes } from '../../../redux/actionCreator/documentTypesActions';
import DropDown from '../../CheckListWizard/Shared/Dropdown';
import './UploadDocument.scss';
import PassportModal from './PassportModal';
import VisaModal from './VisaModal';
import OtherDocsModal from './OtherDocsModal';
import UploadButton from './UploadButton';

export class UploadDocument extends Component {
  
  componentDidMount() {
    const { fetchDocumentTypes, user, fetchUserData, behaviour } = this.props;
    fetchDocumentTypes();
    fetchUserData(user.currentUser.userId);
    
  }

  componentDidUpdate(prevProps) {
    const { behaviour, handleBehaviour, userReadiness: { travelDocuments } } = this.props;
    const documents = travelDocuments[behaviour.payload] || [];
    const prevDocuments = prevProps.userReadiness.travelDocuments[behaviour.payload] || [];
    const check = documents.length === prevDocuments.length; 
    if (!check) {
      const document = documents[documents.length - 1];
      handleBehaviour({ ...behaviour, document});
    }
  }

  handleDropDownOnChange = (value) => {
    const { handleBehaviour, behaviour, userReadiness } = this.props;
    const document = userReadiness.travelDocuments[`${behaviour.payload}`]
      .find(({ data }) => data.imageName === value);
    handleBehaviour({ ...behaviour, document});
  }
  handleClick = () => {
    const { openModal, behaviour } = this.props;
    switch (behaviour.payload) {
    case'passport':
      openModal(true, 'add passport');
      break;
    case 'visa':
      openModal(true, 'add visa');
      break;
    default:
      openModal(true, 'add other');
      return;
    }
  }

  dropDownOptions = () => {
    const { behaviour, userReadiness } = this.props;
    const foundDocument = userReadiness.travelDocuments[`${behaviour.payload}`];
    const options = foundDocument.length > 0 ? foundDocument.map(({ data }) => ({ value: data.imageName, displayValue: data.imageName })) : [];
    return {
      options,
      placeHolder: `Select ${behaviour.payload}`,
      selectAreaSyle: '',
      selectStyle: '',
      selectOptionContainerStyle: 'unknown1'
    };
  }

  renderVisaModal = () => {
    const {
      closeModal, shouldOpen, modalType,
      createTravelReadinessDocument,
      editTravelReadinessDocument, travelReadinessDocuments,
      fetchUserData, user, document, fetchingDocument
    } = this.props;
    return (
      <VisaModal
        closeModal={closeModal} shouldOpen={shouldOpen}
        createTravelReadinessDocument={createTravelReadinessDocument}
        editTravelReadinessDocument={editTravelReadinessDocument}
        documentType="visa" 
        travelReadinessDocuments={travelReadinessDocuments}
        fetchUserData={fetchUserData} user={user}
        document={document} modalType={modalType} fetchingDocument={fetchingDocument}
      />
    );
  };
  
  renderPassportModal = () => {
    const {
      closeModal, shouldOpen,
      modalType, travelReadinessDocuments, showPassportForm,
      createTravelReadinessDocument, editTravelReadinessDocument,
      fetchUserData, user, document, fetchingDocument, scanPassport, passportInfo, retrieving
    } = this.props;
    return (
      <PassportModal 
        closeModal={closeModal} shouldOpen={shouldOpen} modalType={modalType}
        travelReadinessDocuments={travelReadinessDocuments} 
        createTravelReadinessDocument={createTravelReadinessDocument}
        editTravelReadinessDocument={editTravelReadinessDocument}
        scanPassport={scanPassport} fetchUserData={fetchUserData}
        user={user} showPassportForm={showPassportForm}
        document={document} fetchingDocument={fetchingDocument}
        passportInfo={passportInfo} retrieving={retrieving}
      />
    );
  };

  renderOtherDocumentsForm () {
    const {
      user, openModal, closeModal, createTravelReadinessDocument,travelReadinessDocuments,
      fetchUserData, editTravelReadinessDocument, modalType, documentTypes, document,
      shouldOpen, behaviour,
    } = this.props;

    return (
      <OtherDocsModal 
        openModal={openModal}
        shouldOpen={shouldOpen}
        closeModal={closeModal}
        createTravelReadinessDocument={createTravelReadinessDocument}
        travelReadinessDocuments={travelReadinessDocuments}
        documentType="other"
        fetchUserData={fetchUserData}
        user={user}
        editTravelReadinessDocument={editTravelReadinessDocument}
        currentDocument={{}}
        modalType={modalType}
        document={document}
        documentTypes={[behaviour.payload]}
      />
    );
  }
  
  render() {
    const { behaviour, userReadiness } = this.props;
    const foundDocument = userReadiness.travelDocuments[`${behaviour.payload}`];
    const selectedDocument = behaviour.document ? behaviour.document.data.imageName : '';
    const selectedDocumentUrl = behaviour.document && behaviour.document.data.cloudinaryUrl;
    return (
      <Fragment>
        {this.renderPassportModal()}
        {this.renderOtherDocumentsForm()}
        {this.renderVisaModal()}
        {foundDocument ? 
          (
            <div className="upload-behaviour">
              <div className="document-dropdown">
                <DropDown
                  dropdownOptions={this.dropDownOptions()}
                  value={selectedDocument} 
                  changeFunc={this.handleDropDownOnChange}
                />
              </div>
              <span className="separator">OR</span>
              <UploadButton
                behaviour={behaviour}
                onClick={this.handleClick}
              />
            </div>
          )
          : (
            <div className="upload-behaviour">
              <UploadButton
                behaviour={behaviour}
                onClick={this.handleClick}
              />
            </div>)}

        {selectedDocument && 
          (
            <a href={selectedDocumentUrl} rel="noopener noreferrer" target="_blank">
              <img
                src={selectedDocumentUrl}
                alt="document-preview"
                style={{width: '300px', height: '200px'}}
              />
            </a>
          )
        }    
      </Fragment>
    );
  }
}

const mapStateToProps = ({ modal, travelReadinessDocuments, documentTypes, readiness, user }) => ({
  ...modal.modal, travelReadinessDocuments,
  userReadiness: travelReadinessDocuments.userReadiness,
  isLoading: travelReadinessDocuments.isLoading, user: user,
  document: travelReadinessDocuments.document,
  fetchingDocument: travelReadinessDocuments.fetchingDocument,
  passportInfo: travelReadinessDocuments.passportInfo, 
  retrieving: travelReadinessDocuments.scanning, 
  showPassportForm: travelReadinessDocuments.showForm,
  documentTypes: documentTypes.documentTypes,
});

const matchDispatchToProps = {
  openModal, closeModal, createTravelReadinessDocument,
  editTravelReadinessDocument, deleteTravelReadinessDocument,
  fetchUserData: fetchUserReadinessDocuments,
  fetchDocumentDetails: fetchTravelReadinessDocument,
  fetchDocumentTypes,
  scanPassport
};

UploadDocument.propTypes = {
  behaviour: PropTypes.object.isRequired,
  fetchDocumentTypes: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  fetchUserData: PropTypes.func.isRequired,
  handleBehaviour: PropTypes.func,
  userReadiness: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  createTravelReadinessDocument: PropTypes.func.isRequired,
  editTravelReadinessDocument: PropTypes.func.isRequired,
  travelReadinessDocuments: PropTypes.object.isRequired,
  document: PropTypes.object.isRequired,
  fetchingDocument: PropTypes.bool.isRequired,
  showPassportForm: PropTypes.bool.isRequired,
  scanPassport: PropTypes.func.isRequired,
  passportInfo: PropTypes.object.isRequired,
  retrieving: PropTypes.bool.isRequired,
  documentTypes: PropTypes.array.isRequired
};

UploadDocument.defaultProps = {
  handleBehaviour: () => {},
  modalType: ''
};

export default connect(mapStateToProps, matchDispatchToProps)(UploadDocument);
