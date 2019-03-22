import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddVisaForm from '../../components/Forms/TravelReadinessForm/AddVisaForm';
import { closeModal, openModal } from '../../redux/actionCreator/modalActions';
import Modal from '../../components/modal/Modal';
import TravelDocumentModal from '../../components/modal/TravelDocumentModal/TravelDocumentModal';
import PassportForm from '../../components/Forms/TravelReadinessForm/PassportForm';
import { createTravelReadinessDocument } from '../../redux/actionCreator/travelReadinessActions';
import PageHeader from '../../components/PageHeader';
import TravelReadinessDetailsTable from '../TravelReadinessDocuments/UserTravelReadinessDetails/UserTravelReadinessDetailsTable';
import {
  fetchUserReadinessDocuments, editTravelReadinessDocument, deleteTravelReadinessDocument, fetchTravelReadinessDocument
} from '../../redux/actionCreator/travelReadinessDocumentsActions';
import './Readiness.scss';
import ReadinessInteractiveModal from './ReadinessInteractiveModal';

export class TravelReadinessDocuments extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { documentContext: 'passport', documentId: '' };
  }

  componentDidMount() {
    const { fetchUserData, user, location: { search } } = this.props;
    fetchUserData(user.currentUser.userId);
    const travelDocumentDetails = search ? search.split('?').join('').split('&') : '';
    const searchMatch = /id=\w+&type=(passport|other|visa)/.test(search.split('?')[1]);

    if(travelDocumentDetails.length && searchMatch) {
      const id = travelDocumentDetails[0].split('=')[1];
      const type = travelDocumentDetails[1].split('=')[1];
      this.showDocumentDetail(id, type);
    }
  }

  toggleDocumentTab = type => {
    this.setState({
      documentContext: type
    });
    switch (type) {
    case 'passport':
      openModal(true, 'add passport');
      break;
    case 'visa':
      openModal(true, 'add visa');
      break;
    case 'other':
      openModal(true, 'add other');
      break;
    default:
      // Handle the opening of the 'others' modal
      return;
    }
  };

  showDocumentDetail = (documentId, type) => {
    const { openModal } = this.props;
    this.setState({ documentContext: type, documentId });
    openModal(true, 'document details');
  };

  handleModals = documentContext => {
    const { openModal } = this.props;
    switch (documentContext) {
    case 'passport':
      openModal(true, 'add passport');
      break;
    case 'visa':
      openModal(true, 'add visa');
      break;
    case 'other':
      openModal(true, 'add other');
      break;
    default:
      return;
    }
  };

  handleEditDocument = async (documentId) => {
    const { openModal, fetchDocumentDetails } = this.props;
    const { documentContext } = this.state;
    await fetchDocumentDetails(documentId);
    openModal(true, `edit ${documentContext}`);
  }

  handleDeleteDocument = async (documentId) => {
    const { deleteTravelReadinessDocument } = this.props;
    deleteTravelReadinessDocument(documentId);
  }

  renderVisaModal = () => {
    const {
      closeModal, shouldOpen, modalType,
      createTravelReadinessDocument,
      editTravelReadinessDocument, travelReadinessDocuments,
      fetchUserData, user, document, fetchingDocument
    } = this.props;
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
          documentType="visa" travelReadinessDocuments={travelReadinessDocuments}
          fetchUserData={fetchUserData} user={user}
          document={document} modalType={modalType} fetchingDocument={fetchingDocument} />
      </Modal>
    );
  };

  renderOtherDocumentModal = () => {
    return <TravelDocumentModal {...this.props} />;
  };

  renderPassportModal = () => {
    const {
      closeModal, shouldOpen,
      modalType, travelReadinessDocuments,
      createTravelReadinessDocument, editTravelReadinessDocument,
      fetchUserData, user, document, fetchingDocument
    } = this.props;
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
          {...travelReadinessDocuments} fetchUserData={fetchUserData}
          closeModal={closeModal} user={user}
          document={document} modalType={modalType} fetchingDocument={fetchingDocument} />
      </Modal>
    );
  };

  renderButton = (text, active, onClickHandler, document_count, moreProps, normal) => {
    let className = 'documents-button-group__button';
    const { userReadiness, isLoading } = this.props;
    const {
      travelDocuments: { passport, visa }
    } = userReadiness;

    return (
      <button
        type="button"
        key={text}
        className={`${className}${ normal ? '' : (active  ? '--active' : '--inactive')}`}
        onClick={onClickHandler}
        document_count={document_count}
        {...moreProps}
      >
        {text}
        <span className={document_count ? 'documentbutton' : 'addbutton'}>{document_count}</span>
      </button>
    );
  };
  documentButtons = (passport, visa, other) => ([
    {
      name: 'passport',
      display: 'Passports',
      document_count: passport ? passport.length : 0
    },
    {
      name: 'visa',
      display: 'Visas',
      document_count: visa ? visa.length : 0
    },
    {
      name: 'other',
      display: 'Others',
      document_count: other ? other.length : 0
    }
  ]);

  isActive(buttonContext) {
    const { documentContext } = this.state;
    return buttonContext === documentContext;
  }
  renderButtonGroup() {
    const {userReadiness: {travelDocuments: {passport, visa, other}}}= this.props;
    const { documentContext } = this.state;
    const buttons = this.documentButtons(passport, visa, other);
    return (
      <div className="documents-button-group">
        <div>
          {
            buttons.map((button) => (
              this.renderButton(
                button.display,
                this.isActive(button.name),
                () => this.toggleDocumentTab(button.name), 
                button.document_count,
                { id: `${button.name}Button` }) ))
          }
        </div>
        {this.renderButton(
          `Add${' ' + documentContext}`,
          false,
          () => this.handleModals(documentContext), null,
          { id: 'actionButton' }, true)}
      </div> ); }

  render() {
    const { documentId, documentContext, } = this.state;
    const { userReadiness, isLoading, shouldOpen,
      modalType, closeModal, location, openModal, history } = this.props;
    const { travelDocuments: { passport, visa, other  } } = userReadiness;
    return (
      <Fragment>
        <PageHeader title="Travel Documents" />
        {this.renderButtonGroup()}
        {this.renderVisaModal()}
        {this.renderPassportModal()}
        {this.renderOtherDocumentModal()}
        <TravelReadinessDetailsTable
          closeModal={closeModal} shouldOpen={shouldOpen} openModal={openModal}
          modalType={modalType} isLoading={isLoading} deleteDocument={this.handleDeleteDocument}
          activeDocument={documentContext} passports={passport}
          visas={visa} others={other} location={location}
          handleShowDocument={this.showDocumentDetail} documentId={documentId}
          userData={userReadiness} editDocument={this.handleEditDocument} history={history}
        />
        <ReadinessInteractiveModal
          closeModal={closeModal} shouldOpen={shouldOpen}
          modalType={modalType} documentContext={documentContext}
          handleModals={this.handleModals} />
      </Fragment>
    ); }
}

const mapStateToProps = ({ modal, travelReadinessDocuments, user }) => ({
  ...modal.modal, travelReadinessDocuments,
  userReadiness: travelReadinessDocuments.userReadiness,
  isLoading: travelReadinessDocuments.isLoading, user: user,
  document: travelReadinessDocuments.document,
  fetchingDocument: travelReadinessDocuments.fetchingDocument,
});

const matchDispatchToProps = {
  openModal, closeModal, createTravelReadinessDocument,
  editTravelReadinessDocument, deleteTravelReadinessDocument,
  fetchUserData: fetchUserReadinessDocuments,
  fetchDocumentDetails: fetchTravelReadinessDocument,
};

TravelReadinessDocuments.propTypes = {
  closeModal: PropTypes.func.isRequired, openModal: PropTypes.func.isRequired,
  modalType: PropTypes.string, shouldOpen: PropTypes.bool.isRequired,
  createTravelReadinessDocument: PropTypes.func.isRequired,
  editTravelReadinessDocument: PropTypes.func.isRequired,
  deleteTravelReadinessDocument: PropTypes.func.isRequired,
  fetchDocumentDetails: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
};

TravelReadinessDocuments.defaultProps = { modalType: 'add visa' };

export default connect(
  mapStateToProps, matchDispatchToProps
)(TravelReadinessDocuments);
