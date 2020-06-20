import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './index.scss';
import ContextMenu from '../ContextMenu/ContextMenu';
import MenuItem from '../ContextMenu/MenuItem';
import Pagination from '../Pagination/Pagination';
import Preloader from '../Preloader/Preloader';
import ReminderTemplatePlaceholder from '../Placeholders/ReminderTemplatePlaceholder';

class DocumentTypesList extends Component {

  state = {
    currentPage: 1,
  }

  onPageChange = currentPage => this.setState({ currentPage })

  openEditForm = documentType => {
    const { openForm } = this.props;
    return () => openForm({ name: documentType.name });
  }

  openDeleteModal = documentType => {
    const { openDeleteModal } = this.props;
    return () => openDeleteModal(documentType);
  }

  renderPaginatedDocumentTypes = () => {
    const { documentTypes, openForm, openDeleteModal } = this.props;
    const { currentPage } = this.state;
    const pageCount = Math.ceil(documentTypes.length / 10);
    const pageStart = (currentPage - 1) * 10;
    const paginatedDocumentTypes = documentTypes.slice(pageStart, pageStart + 10);
    return (
      <div className="document-types-list">
        <div className="document-type header">
          <span className="type">Type</span>
          <span className="created-on">Created on</span>
        </div>
        <div className="document-types content">
          {paginatedDocumentTypes.map(documentType => {
            return (
              <div className="single-document-type" key={documentType.id}>
                <span className="name">{documentType.name}</span>
                <span className="createdAt">{moment(documentType.createdAt).format('DD/MM/YYYY')}</span>
                <span className="menu-wrapper">
                  {!['passport', 'visa'].includes(documentType.name) && (
                    <ContextMenu>
                      <MenuItem 
                        classNames="edit document-type-context-menu"
                        onClick={this.openEditForm(documentType)}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem 
                        classNames="delete document-type-context-menu"
                        onClick={this.openDeleteModal(documentType)}
                      >
                        Delete
                      </MenuItem>
                    </ContextMenu>
                  )}
                </span>
              </div>
            );
          })}
        </div>
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={this.onPageChange}
        />
      </div>
    );
  }

  renderPreloader = () => (
    <div className="document-types-preloader">
      <ReminderTemplatePlaceholder />
    </div>
  )
  
  render() {
    const { isLoading } = this.props;
    return (
      <Fragment>
        {isLoading && this.renderPreloader()}
        {!isLoading && this.renderPaginatedDocumentTypes()}
      </Fragment>
    );
  }
}

DocumentTypesList.propTypes = {
  isLoading:PropTypes.bool.isRequired,
  documentTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  openForm: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
};

export default DocumentTypesList;
