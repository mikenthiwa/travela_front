import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../../components/modal/Modal';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import { fetchDocuments, editDocument, updateDocumentOnEdit, updateDocument,
  deleteDocument, removeDocumentFromEdit, createDocument,   downloadDocuments
} from '../../redux/actionCreator/documentActions';
import DocumentsHeader from '../../components/DocumentsHeader';
import NewDocumentForm from '../../components/Forms/NewDocumentForm';
import DocumentTable from './DocumentTable';
import './Documents.scss';
import DeleteModal from './DeleteModal';
import Preloader from '../../components/Preloader/Preloader';
import ButtonLoadingIcon from '../../components/Forms/ButtonLoadingIcon';

export class Documents extends Component {
  state = {
    menuOpen: { open: false, id: null },
    documentId: null,
    documentToDelete: '',
    documentToDownlod: '',
    hasBlankFields: true
  };
  componentDidMount() {
    const { fetchDocuments } = this.props;
    fetchDocuments();
  }
  setItemToDelete = (documentId, documentToDelete) => () => {
    let { openModal } = this.props;
    openModal(true, 'delete document');
    this.setState({ documentId, documentToDelete });
  };
  deleteUserDocument = () => {
    const { deleteDocument } = this.props;
    const { documentId } = this.state;
    deleteDocument(documentId);
  };
  handleCloseModal = () => {
    const { closeModal } = this.props;
    const { menuOpen } = this.state;
    menuOpen.open && this.setState(
      { menuOpen: { open: false, id: null } }
    );
    return closeModal();
  };
  handleDownloadDocuments = () => {
    const { downloadDocuments } = this.props;
    const { documentToDownlod: { cloudinary_url, name } } = this.state;
    downloadDocuments(cloudinary_url, name);
  };
  toggleMenu = (document) => {
    const { menuOpen } = this.state;
    const { id } = document;
    if (id && (menuOpen.id !== id)) {
      return this.setState({ menuOpen: { open: true, id } });
    }
    this.setState({ menuOpen: { open: false, id: null } });
  };
  openAddModal = () => {
    let{ openModal } = this.props;
    openModal(true, 'add document');
  };
  handleOpenModal = (modalType, document = '') => {
    let { openModal } = this.props;
    openModal(true, modalType);
    this.setState({ menuOpen: { open: false, id: null }, documentToDownlod: document });
  };
  handleCloseEditModal = () => {
    const { closeModal, removeDocumentFromEdit } = this.props;
    const { menuOpen } = this.state;
    menuOpen.open && this.setState({ menuOpen: { open: false, id: null } });
    closeModal();
    return removeDocumentFromEdit();
  };

  handleRenameDocument = () => {
    const { documentOnEdit, updateDocument } = this.props;
    this.setState({ hasBlankFields: true});
    updateDocument(documentOnEdit);
  };
  handleInputChange = (event) => {
    const { value } = event.target;
    const { documentOnEdit, updateDocumentOnEdit } = this.props;
    this.setState({ hasBlankFields: this.textValidator(value)});
    documentOnEdit && updateDocumentOnEdit(value);
  };
   textValidator = (value) => {
     const isString = typeof(value) === 'string' &&
     (value.replace(/\s+/, '')).length > 0 ;
     if (isString) return false;
     return true;
   };

  handleSubmitDownload = () => {
    const { documentToDownlod: { name } } = this.state; return (
      <div className="download-document-body">
        <div className="download-document-align">
          <span className="delete-checklist-item__disclaimer restore-checklist-items_span">
            <span>
              {' '}
              Are you sure you want to download this document
              {' '}
              <strong>{name}</strong>
              ?
            </span>
          </span>
        </div>

        <div className="download-document-hr" />
        <div className="delete-checklist-item__footer delete-checklist-item__right">
          <button
            type="button" 
            className="delete-checklist-item__footer--cancel" 
            onClick={this.handleCloseEditModal}>
            Cancel

          </button>
          <button
            type="button" 
            className="bg-btn bg-btn--active" 
            onClick={this.handleDownloadDocuments}>
            Download
          </button>
        </div>
      </div>
    );
  };

  renderDocumentEditModal = () => {
    const { shouldOpen, modalType } = this.props;
    return (
      <Modal
        closeModal={this.handleCloseEditModal}
        width="480px"
        modalId="edit-document-modal"
        modalContentId="edit-document-modal-content"
        visibility={
          (shouldOpen && modalType === 'rename document') ? 'visible' : 'invisible'
        }
        title="Rename File"
      >
        {this.renderDocumentRenameForm()}
        {this.renderSubmitArea()}
      </Modal>
    );
  };

  renderSubmitArea = () => {
    const { isUpdating } = this.props;
    const { hasBlankFields } = this.state;
    return (
      <div className="submit-area">
        <p>
          <button
            type="button"
            className="bg-btn bg-btn--inactive"
            id="oncancel"
            onClick={this.handleCloseEditModal}
          >
            Cancels
          </button>
          <button
            type="button"
            className="bg-btn bg-btn--inactive doc-btn-save"
            id="cancel"
            disabled={hasBlankFields}
            onClick={this.handleRenameDocument}
          >
            <ButtonLoadingIcon isLoading={isUpdating} buttonText="Save" />
          </button>
        </p>
      </div>
    );
  };

  renderDocumentRenameForm = () => {
    const { documentOnEdit } = this.props;
    return (
      <div className="doc-rename">
        <label htmlFor="doc-rename-input">
            Name
          <span className="asterisk">*</span>
          <br />
          <input
            type="text"
            className="doc-rename-input"
            onChange={this.handleInputChange}
            value={documentOnEdit ? documentOnEdit.name : ''}
          />
        </label>
      </div>
    );
  };

  renderDocumentDownloadModal = () => {
    const { shouldOpen, modalType } = this.props;
    return (
      <Modal
        closeModal={this.handleCloseEditModal}
        width="480px"
        modalId="edit-document-modal"
        modalContentId="edit-document-modal-content"
        visibility={
          shouldOpen && modalType.match('download document')
            ? 'visible'
            : 'invisible'
        }
        title="Download File"
      >
        {this.handleSubmitDownload()}
      </Modal>
    );
  };
  renderDocumentsHeader() {
    return (
      <div>
        <DocumentsHeader openModal={this.openAddModal} />
      </div>
    );
  }

  renderNoDocumentMessage() {
    const { documents } = this.props;
    return (
      <div>
        <div className="checkInTable__trips--empty">
          { !documents.length && 'No uploaded documents at the moment' }
        </div>
      </div>
    );
  }

  renderDocumentsForm() {
    const { closeModal, shouldOpen, modalType, user, createDocument, isUploading } = this.props;
    return (
      <Modal
        customModalStyles="add-document-item" closeModal={closeModal} width="480px" height="375px"
        visibility={
          shouldOpen && (modalType === 'add document') ? 'visible' : 'invisible'
        }
        title="Add File"
      >
        <NewDocumentForm
          closeModal={closeModal}
          user={user}
          createDocument={createDocument}
          isUploading={isUploading}
        />
      </Modal>
    );
  }

  renderDocumentsPage() {
    const { isLoading, documents, closeModal, shouldOpen, modalType, editDocument } = this.props;
    const { menuOpen, documentToDelete } = this.state;
    let documentForDelete = `your ${documentToDelete}`;
    const currentDocuments = (documents.length !== 0) ? (
      <DocumentTable
        documents={documents}
        menuOpen={menuOpen}
        toggleMenu={this.toggleMenu}
        openModal={this.handleOpenModal}
        setItemToDelete={this.setItemToDelete}
        editDocument={editDocument}
      />
    ):
      this.renderNoDocumentMessage();
    return (
      <Fragment>
        {this.renderDocumentsForm()}
        {this.renderDocumentsHeader()}

        <div className="document__table">
          {isLoading ? <Preloader /> : currentDocuments }
        </div>
        <DeleteModal
          closeModal={closeModal}
          shouldOpen={shouldOpen}
          modalType={modalType}
          handleDelete={this.deleteUserDocument}
          documentName={documentForDelete}
          title="Delete document"
        />
        {this.renderDocumentEditModal()}
        {this.renderDocumentDownloadModal()}
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderDocumentsPage()}
      </Fragment>
    );
  }
}

export const mapStateToProps = ({ modal, user, documents }) => ({
  ...modal.modal,
  user: user.getUserData,
  documents: documents.documents,
  isLoading: documents.isLoading,
  documentOnEdit: documents.documentOnEdit,
  isUpdating: documents.updatingDocument,
  isUploading: documents.isUploading
});

const matchDispatchToProps = {
  openModal,
  closeModal,
  createDocument,
  fetchDocuments,
  deleteDocument,
  editDocument,
  updateDocumentOnEdit,
  updateDocument,
  removeDocumentFromEdit,
  downloadDocuments
};

Documents.propTypes = {
  user: PropTypes.object,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  createDocument: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  fetchDocuments: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  downloadDocuments: PropTypes.func.isRequired,
  documents: PropTypes.array.isRequired,
  editDocument: PropTypes.func.isRequired,
  documentOnEdit: PropTypes.object,
  updateDocumentOnEdit: PropTypes.func.isRequired,
  removeDocumentFromEdit: PropTypes.func.isRequired,
  updateDocument: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  isUploading: PropTypes.bool.isRequired,
};


Documents.defaultProps ={
  modalType: null,
  user: {},
  documentOnEdit: null
};


export default connect(mapStateToProps, matchDispatchToProps)(Documents);
