import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
  fetchDocumentTypes,
  editDocumentTypes,
  createDocumentTypes,
  deleteDocumentTypes,
} from '../../redux/actionCreator/documentTypesActions';
import PageHeader from '../../components/PageHeader';
import DocumentTypesList from '../../components/DocumentTypes/DocumentTypesList';
import DocumentTypesForm from '../../components/DocumentTypes/DocumentTypesForm';
import DocumentTypeDeleteModal from '../../components/DocumentTypes/DocumentTypeDeleteModal';
import './index.scss';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';


export class DocumentTypes extends Component {
  
  componentDidMount() {
    const { fetchDocumentTypes } = this.props;
    fetchDocumentTypes();
  }
  
  openForm = edit => {
    const { openModal } = this.props;
    openModal(true, edit ? 'EDIT_DOCUMENT_TYPE' : 'CREATE_DOCUMENT_TYPE', edit);
  }

  openDeleteModal = documentType => {
    const { openModal } = this.props;
    openModal(true, 'DELETE_DOCUMENT_TYPE', documentType);
  }

  editDocumentTypes = newName => {
    const { editDocumentTypes, page: documentType } = this.props;
    editDocumentTypes({ name: documentType.name, newName });
  }

  deleteDocumentTypes = () => {
    const { deleteDocumentTypes, page: documentType } = this.props;
    deleteDocumentTypes(documentType.name);
  }

  renderHeader() {
    const { documentTypes: { isLoading } } = this.props;
    return (
      <div className="document-type-view">
        <PageHeader
          title="DOCUMENT TYPES"
          actionBtn="ADD DOCUMENT TYPE"
          actionBtnClickHandler={this.openForm}
          isLoading={isLoading}
        />
      </div>
    );
  }

  render() {
    const {
      documentTypes: { documentTypes, isLoading, editLoading, createLoading, deleteLoading }, 
      shouldOpen, 
      closeModal,
      page, 
      modalType, 
      createDocumentTypes, 
    } = this.props;
    const documentType = page || {};
    return (
      <Fragment>
        {this.renderHeader()}
        <DocumentTypesList
          documentTypes={documentTypes}
          openForm={this.openForm}
          openDeleteModal={this.openDeleteModal}
          isLoading={isLoading}
        />
        <DocumentTypesForm 
          shouldOpen={shouldOpen}
          closeModal={closeModal}
          modalType={modalType}
          initialValue={documentType.name || ''}
          editDocumentTypes={this.editDocumentTypes}
          createDocumentTypes={createDocumentTypes}
          isLoading={editLoading || createLoading}
        />
        <DocumentTypeDeleteModal
          shouldOpen={shouldOpen}
          closeModal={closeModal}
          modalType={modalType}
          deleteDocumentTypes={this.deleteDocumentTypes}
          isLoading={deleteLoading}
        />
      </Fragment>
    );
  }
}

DocumentTypes.propTypes = {
  documentTypes: PropTypes.object.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  page: PropTypes.object,
  modalType: PropTypes.string,
  editDocumentTypes: PropTypes.func.isRequired,
  createDocumentTypes: PropTypes.func.isRequired,
  deleteDocumentTypes: PropTypes.func.isRequired,
  fetchDocumentTypes: PropTypes.func.isRequired,
};

DocumentTypes.defaultProps = {
  page: {},
  modalType: '',
};

const mapStateToProps = ({ modal, documentTypes }) => ({
  ...modal.modal,
  documentTypes,
});

const mapDispatchToProps = {
  fetchDocumentTypes,
  editDocumentTypes,
  createDocumentTypes,
  deleteDocumentTypes,
  openModal,
  closeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentTypes);
