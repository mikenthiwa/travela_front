import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {capitalize} from 'lodash';
import withLoading from '../../../components/Hoc/withLoading';
import '../TravelReadinessDocuments.scss';
import Modal from '../../../components/modal/Modal';
import ConnectedDocumentDetailsModal from './DocumentDetailsModal';
import TableMenu from '../../../components/TableMenu/TableMenu';

export class UserTravelReadinessDetailsTable extends Component {
  state = {
    menuOpen: {
      open: false, id: null
    }
  };

  componentDidMount() {
    const { location : { search }, handleShowDocument } = this.props;
    const travelDocumentDetails = search ? search.split('?').join('').split('&') : '';
    const searchMatch = /id=\w+&type=(passport|other|visa)/.test(search.split('?')[1]);

    if(travelDocumentDetails.length && searchMatch) {
      const id = travelDocumentDetails[0].split('=')[1];
      const type = travelDocumentDetails[1].split('=')[1];
      handleShowDocument(id, type);
    }
  }

  toggleMenu = (documentId, document) => {
    const { menuOpen } = this.state;
    if (menuOpen.id !== documentId) {
      return this.setState({
        menuOpen: {
          open: true, id: documentId, document
        }
      });
    }
    this.setState({
      menuOpen: {
        open: !menuOpen.open, id: documentId, document
      }
    });
  }

  renderTableHeadRows(columnNames) {
    return (
      <tr>
        {
          columnNames.map(column => (
            <th key={column} className="mdl-data-table__cell--non-numeric table__head table-head-rows">{column}</th>)
          )
        }
      </tr>
    );
  }

  renderTableHead() {
    const { activeDocument , viewType} = this.props;
    let columnNames = [
      'Country', 'Entry Type', 'Visa Type', 'Issue Date', 'Expiry Date', 'Attachments', 'Status'
    ];

    if(activeDocument === 'passport') {
      columnNames = [
        'Passport No', 'Date of Birth', 'Date of Issue', 'Place of Issue',
        'Expiry Date', 'Attachments', 'Status'
      ];
    }
    if(activeDocument === 'other') {
      columnNames = [
        'Document Name', 'Document Id', 'Date of Issue',
        'Expiry Date', 'Attachments', 'Status'
      ];
    }
    if( viewType === 'self') {
      columnNames.push('');
    }
    return (
      <thead>{this.renderTableHeadRows(columnNames)}</thead>
    );
  }

  renderTableBody() {
    const { activeDocument, passports, visas, others } = this.props;
    return(
      <tbody className="table__body">
        {
          this.renderDocuments({
            activeDocument, passports, visas, others
          })
        }
      </tbody>
    );
  }

  renderDocuments({
    activeDocument, passports, visas, others
  }) {
    switch(activeDocument) {
    case 'passport':
      return passports.map(data => this.renderPassPortRow(data));
    case'visa':
      return visas.map(data => this.renderVisaRow(data));
    case 'other':
      return others.map(data => this.renderOtherDocumentRow(data));
    default:
      return;
    }
  }

  renderPassPortRow(passportData) {
    const {id, data: { passportNumber, dateOfBirth, dateOfIssue, placeOfIssue, expiryDate, nationality }, isVerified } = passportData;
    const status = isVerified ? 'Verified' : 'Pending';
    const attachments = `${nationality}-passport`;
    const { handleShowDocument } = this.props;
    return (
      <tr key={id} className="table__rows">
        <td className="mdl-data-table__cell--non-numeric table__data">
          <span
            onClick={() => handleShowDocument(id, 'passport')}
            role="presentation"
            className="document-name"
          >
            {passportNumber}
          </span>
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data special">{dateOfBirth}</td>
        <td className="mdl-data-table__cell--non-numeric table__data special">{dateOfIssue}</td>
        <td className="mdl-data-table__cell--non-numeric table__data">{placeOfIssue}</td>
        <td className="mdl-data-table__cell--non-numeric table__data special">{expiryDate}</td>
        <td className="mdl-data-table__cell--non-numeric table__data">{attachments}</td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          <span className={status.toLowerCase()}>{status}</span>
        </td>
        {
          this.renderTableMenu({passportData})
        }
      </tr>
    );
  }

  renderTableMenu(props) {
    const { type, editDocument, shouldOpen,
      modalType, closeModal, openModal, deleteDocument, viewType, history  } = this.props;
    const { menuOpen } = this.state;
    return (viewType === 'self' && (
      <td className="mdl-data-table__cell--non-numeric table__data">
        <TableMenu
          {...props} menuOpen={menuOpen} type={type} closeModal={closeModal}
          shouldOpen={shouldOpen} openModal={openModal} deleteDocument={deleteDocument}
          toggleMenu={this.toggleMenu} editDocument={editDocument} modalType={modalType}
          history={history}
        />
      </td>
    ));
  }
  renderVisaRow(visaData) {
    const { id, data: {country, entryType, visaType, dateOfIssue, expiryDate}, isVerified } = visaData;
    const status = isVerified ? 'Verified' : 'Pending';
    const attachments = `${country}-visa`;
    const { handleShowDocument } = this.props;
    return (
      <tr key={id} className="table__rows">
        <td className="mdl-data-table__cell--non-numeric table__data">
          <span
            onClick={() => handleShowDocument(id, 'visa')}
            role="presentation"
            className="document-name"
          >
            {country}
          </span>
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">{entryType}</td>
        <td className="mdl-data-table__cell--non-numeric table__data special">{visaType}</td>
        <td className="mdl-data-table__cell--non-numeric table__data special">{dateOfIssue}</td>
        <td className="mdl-data-table__cell--non-numeric table__data special">{expiryDate}</td>
        <td className="mdl-data-table__cell--non-numeric table__data">{attachments}</td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          <span className={status.toLowerCase()}>{status}</span>
        </td>
        {
          this.renderTableMenu({ visaData })
        }
      </tr>
    );
  }

  renderOtherDocumentRow(documentData) {
    const { id, data: {name, dateOfIssue, expiryDate, documentId, cloudinaryUrl }, isVerified } = documentData;
    const status = isVerified ? 'Verified': 'Pending';
    const attachments = `${name}-document`;
    const { handleShowDocument
    } = this.props;
    return (
      <tr key={id} className="table__rows">
        <td className="mdl-data-table__cell--non-numeric table__data">
          <span
            onClick={() => handleShowDocument(id, 'other')}
            role="presentation"
            className="document-name"
          >
            {name}
          </span>
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">{documentId || 'N/A'}</td>
        <td className="mdl-data-table__cell--non-numeric table__data special">{dateOfIssue}</td>
        <td className="mdl-data-table__cell--non-numeric table__data special">{expiryDate}</td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          <a className="table__data--link" target="_blank" rel="noopener noreferrer" href={cloudinaryUrl}>{attachments}</a>
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">
          <span className={status.toLowerCase()}>{status}</span>
        </td>
        {
          this.renderTableMenu({ documentData })
        }
      </tr>
    );
  }

  renderDocumentModal() {
    const{ activeDocument, closeModal, shouldOpen, modalType, documentId, userData } = this.props;
    return (
      <Modal
        title={`${capitalize(activeDocument)} Details`}
        closeModal={closeModal}
        modalId="travel-doc-details-content"
        visibility={shouldOpen && modalType === 'document details' ? 'visible' : 'invisible'}
      >
        <ConnectedDocumentDetailsModal userData={userData} documentId={documentId} documentType={activeDocument} />
      </Modal>
    );
  }

  renderOtherDocuments() {
    return(
      <div className="other__documents--empty">
        <p>Other documents you can upload include:-</p>
        <p>
          <span>&#8226;</span>
          {' '}
          A yellow fever card
        </p>
        <p>
          <span>&#8226;</span>
          {' '}
          Travel Health Insurance
        </p>
      </div>
    );
  }

  render() {
    const { activeDocument } = this.props;
    const { props } = this;
    if((!props[`${activeDocument}s`].length) ) {
      return (
        <div className="table__readiness--empty">
          {`${activeDocument}` === 'other' ?
            this.renderOtherDocuments() :
            `No ${activeDocument}s  are displayed because you have no uploaded ${activeDocument} documents`}
        </div>
      );
    }

    return (
      <div className="table__container">
        <table className="mdl-data-table mdl-js-data-table readiness-table">
          {this.renderTableHead()}
          {this.renderTableBody()}
        </table>
        {this.renderDocumentModal()}
      </div>
    );
  }
}

UserTravelReadinessDetailsTable.propTypes = {
  passports: PropTypes.array, visas: PropTypes.array,
  activeDocument: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func,
  viewType: PropTypes.string,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  handleShowDocument: PropTypes.func.isRequired,
  documentId: PropTypes.string, others: PropTypes.array,
  userData: PropTypes.object.isRequired,
  editDocument: PropTypes.func, type: PropTypes.string,
  location: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func
};

UserTravelReadinessDetailsTable.defaultProps = {
  modalType: '',
  type: 'documents',
  editDocument: () => {},
  passports: [],
  visas: [],
  others: [],
  documentId: '',
  viewType: 'self',
  deleteDocument: () => {}, openModal: () => {}
};

export default withLoading(UserTravelReadinessDetailsTable);
