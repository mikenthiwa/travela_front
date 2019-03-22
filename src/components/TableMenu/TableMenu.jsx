import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import editIcon from '../../images/edit.svg';
import checkListIcon from '../../images/checklisticon.svg';
import cancelIcon from '../../images/cancel.svg';
import deleteIcon from '../../images/deleted.svg';
import DeleteModal from '../../views/Documents/DeleteModal';

class TableMenu extends PureComponent {
  showDeleteModal = () => {
    let { openModal } = this.props;
    openModal(true, 'delete document');
  }

  confirmDeleteRequest = (e) => {
    e.preventDefault();
    const { deleteRequest, request, closeModal } = this.props;
    switch (!isEmpty(request.id)) {
    case true:
      deleteRequest(request.id);
      closeModal(true, 'new model'); break;
    case false:
      this.deleteTravelDocument(); break;
    default: break;
    }
  }

  deleteTravelDocument = () => {
    const { passportData, visaData, documentData, deleteDocument } = this.props;
    const documentToBeDeleted = [passportData, visaData, documentData].filter(document => document.id !== undefined)[0];
    deleteDocument(documentToBeDeleted.id);
  }
  handleIconOpentoggle = (toggleMenu, data, toggleId) => {
    return (
      <i
        className="fa fa-ellipsis-v" id={toggleId}
        role="presentation" onClick={() => toggleMenu(data.id, data)}
      />
    );
  };

  handleIconClosetoggle = (toggleMenu, data, toggleId) => {
    return (
      <li
        className="table__menu-list-item" id={toggleId}
        onClick={() => toggleMenu(data.id, data)} role="presentation"
      >
        <img src={cancelIcon} alt="cancel-icon" className="menu-icon" />
        Cancel
      </li>
    );
  };

  renderDeleteModalDocumentName = (data) => {
    if (data.type === 'passport') {
      return `this ${data.data.nationality} ${data.type}`;
    } else if (data.type === 'visa') {
      return `this ${data.data.country} visa`;
    } else {
      return `this ${data.data.name}`;
    }
  }
  renderDeleteModalName = (requestId, data) => {
    switch (!isEmpty(requestId)){
    case true: return requestId;
    case false: return this.renderDeleteModalDocumentName(data);
    default: return 'Home';
    }
  }

  renderDelete = (data) => {
    const { shouldOpen, closeModal, modalType, request } = this.props;
    return (
      <li
        className="table__menu-list-item" id="deleteRequest"
        onClick={this.showDeleteModal} role="presentation"
      >
        <img src={deleteIcon} alt="delete-icon" className="menu-icon" />
        Delete
        <DeleteModal
          closeModal={closeModal} shouldOpen={shouldOpen} handleDelete={this.confirmDeleteRequest}
          modalType={modalType} documentName={this.renderDeleteModalName(request.id, data)}
          title={!isEmpty(request.id) ? 'Delete Request' : 'Delete Document'}
        />
      </li>
    );
  }

  openToggleMenu(data) {
    const { menuOpen } = this.props;
    const openMenu = menuOpen.id === data.id && menuOpen.open;
    return openMenu;
  }

  renderToggle = () => {
    const { toggleMenu, editRequest, request, type, requestStatus, history } = this.props;

    return (
      <div>
        {!(type === 'verifications') && this.handleIconOpentoggle(toggleMenu, request, 'toggleIcon')}
        <div className={`table__menu-container ${this.openToggleMenu(request) ? 'open' : ''}`}>
          {type === 'requests' && (
            <ul className="table__menu-list">
              {requestStatus === 'Open' && (
                <li
                  className="table__menu-list-item" id="iconBtn"
                  onClick={() => {
                    toggleMenu(request.id);
                    history.push(`/requests/edit-request/${request.id}`);
                  }} role="presentation"
                >
                  <img src={editIcon} alt="edit-icon" className="menu-icon" />
                  Edit
                </li>)}
              {requestStatus === 'Open' && this.renderDelete()}
              {this.handleIconClosetoggle(toggleMenu, request, 'toggleButton')}
            </ul>
          )}
        </div>
      </div>
    );
  };

  renderEditButton = (data) => {
    const { toggleMenu, editDocument } = this.props;
    return (
      <Fragment>
        { this.handleIconOpentoggle(toggleMenu, data, 'toggleIcon2') }
        <div className={`table__menu-container ${
          this.openToggleMenu(data) ? 'open' : ''}`
        }>
          <ul className="table__menu-list">
            {!data.isVerified && (
              <li
                className="table__menu-list-item" id="iconBtn2"
                onClick={() => {
                  toggleMenu(data.id);
                  editDocument(data.id);
                }} role="presentation"
              >
                <img src={editIcon} alt="edit-icon" className="menu-icon" />
                Edit
              </li>)}
            {!data.isVerified && ( this.renderDelete(data) )}
            {this.handleIconClosetoggle(toggleMenu, data, 'toggleButton2')}
          </ul>
        </div>
      </Fragment>
    );
  }

  renderDocumentsToggle() {
    const { passportData, visaData, documentData } = this.props;
    return (
      <div>
        { !isEmpty(passportData) && this.renderEditButton(passportData) }
        { !isEmpty(visaData) && this.renderEditButton(visaData) }
        { !isEmpty(documentData) && this.renderEditButton(documentData) }
      </div>
    );
  }

  render() {
    const { request, passportData, visaData, documentData } = this.props;
    return (
      <div className="menu__container">
        {!isEmpty(request) && this.renderToggle()}
        {!isEmpty(passportData) && this.renderDocumentsToggle()}
        {!isEmpty(visaData) && this.renderDocumentsToggle()}
        {!isEmpty(documentData) && this.renderDocumentsToggle()}
      </div>
    );
  }
}
TableMenu.defaultProps = {
  modalType: ''
};

TableMenu.propTypes = {
  editRequest: PropTypes.func,
  request: PropTypes.object,
  requestStatus: PropTypes.string,
  type: PropTypes.string,
  toggleMenu: PropTypes.func.isRequired,
  menuOpen: PropTypes.object.isRequired,
  deleteRequest: PropTypes.func,
  shouldOpen: PropTypes.bool,
  modalType: PropTypes.string,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  passportData: PropTypes.object,
  visaData: PropTypes.object,
  documentData: PropTypes.object,
  editDocument: PropTypes.func,
  deleteDocument: PropTypes.func,
  history: PropTypes.object.isRequired
};
TableMenu.defaultProps = {
  modalType: '',
  passportData: {},
  visaData: {},
  documentData: {},
  editDocument: () => {},
  editRequest: () => {},
  request: {},
  requestStatus: '',
  type: '',
  deleteRequest: () => {},
  shouldOpen: false,
  openModal: () => {},
  closeModal: () => {},
  deleteDocument: () => { }
};

export default TableMenu;
