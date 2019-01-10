import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import withLoading from '../../../components/Hoc/withLoading';
import '../TravelReadinessDocuments.scss';
import Modal from '../../../components/modal/Modal';
import DocumentDetailsModal from './DocumentDetailsModal';

export class UserTravelReadinessDetailsTable extends Component {
  state = {};

  renderTableHeadRows(columnNames) {
    return (
      <tr>
        {
          columnNames.map(column => (
            <th key={column} className="mdl-data-table__cell--non-numeric table__head">{column}</th>)
          )
        }
      </tr>
    );
  }

  renderTableHead() {
    const { activeDocument } = this.props;
    let columnNames = [
      'Country', 'Entry Type', 'Visa Type', 'Issue Date', 'Expiry Date', 'Attachments', 'Status',
    ];

    if(activeDocument === 'passport') {
      columnNames = [
        'Passport No', 'Date of Birth', 'Date of Issue', 'Place of Issue',
        'Expiry Date', 'Attachments', 'Status',
      ];
    }
    return (
      <thead>{this.renderTableHeadRows(columnNames)}</thead>
    );
  }

  renderTableBody() {
    const { activeDocument, passports, visas } = this.props;
    return activeDocument === 'passport' ? (
      <tbody className="table__body">
        {
          passports.map(data => this.renderPassPortRow(data))
        }
      </tbody>
    ) : (
      <tbody className="table__body">
        {
          visas.map(data => this.renderVisaRow(data))
        }
      </tbody>
    );
  }

  renderPassPortRow(passportData) {
    const {id, data: { passportNumber, dateOfBirth, dateOfIssue, placeOfIssue, expiryDate, nationality }, isVerified } = passportData;
    const status = isVerified ? 'Verified': 'Pending';
    const attachments = `${nationality}-passport`;
    const { handleShowDocument } = this.props;
    return (
      <tr key={id} className="table__rows">
        <td className="mdl-data-table__cell--non-numeric table__data">
          <span
            onClick={() => handleShowDocument(id)}
            role="presentation"
            className="document-name"
          >
            {passportNumber}
          </span>
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">{dateOfBirth}</td>
        <td className="mdl-data-table__cell--non-numeric table__data">{dateOfIssue}</td>
        <td className="mdl-data-table__cell--non-numeric table__data">{placeOfIssue}</td>
        <td className="mdl-data-table__cell--non-numeric table__data">{expiryDate}</td>
        <td className="mdl-data-table__cell--non-numeric table__data">{attachments}</td>
        <td className="mdl-data-table__cell--non-numeric table__data">{status}</td>
      </tr>
    );
  }

  renderVisaRow(visaData) {
    const { id, data: {country, entryType, visaType, dateOfIssue, expiryDate}, isVerified } = visaData;
    const status = isVerified ? 'Verified': 'Pending';
    const attachments = `${country}-visa`;
    const { handleShowDocument } = this.props;
    return (
      <tr key={id} className="table__rows">
        <td className="mdl-data-table__cell--non-numeric table__data">
          <span
            onClick={() => handleShowDocument(id)}
            role="presentation"
            className="document-name"
          >
            {country}
          </span>
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data">{entryType}</td>
        <td className="mdl-data-table__cell--non-numeric table__data">{visaType}</td>
        <td className="mdl-data-table__cell--non-numeric table__data">{dateOfIssue}</td>
        <td className="mdl-data-table__cell--non-numeric table__data">{expiryDate}</td>
        <td className="mdl-data-table__cell--non-numeric table__data">{attachments}</td>
        <td className="mdl-data-table__cell--non-numeric table__data">{status}</td>
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
        visibility={
          shouldOpen && modalType === 'document details'
            ? 'visible'
            : 'invisible'
        }
      >
        <DocumentDetailsModal userData={userData} documentId={documentId} documentType={activeDocument} />
      </Modal>
    );
  }

  render() {
    const { activeDocument, passports, visas } = this.props;

    if((activeDocument === 'passport' && !passports.length) || (activeDocument === 'visa' && !visas.length)) {
      return (
        <div className="table__readiness--empty">
          No
          {' '}
          {activeDocument}
          s
        </div>
      );
    }

    return (
      <div className="table__container">
        <table className="mdl-data-table mdl-js-data-table readiness-table">
          {this.renderTableHead()}
          {this.renderTableBody()}
          {this.renderDocumentModal()}
        </table>
      </div>
    );
  }
}

UserTravelReadinessDetailsTable.propTypes = {
  passports: PropTypes.array,
  visas: PropTypes.array,
  activeDocument: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  handleShowDocument: PropTypes.func.isRequired,
  documentId: PropTypes.string,
  userData: PropTypes.object.isRequired,
};

UserTravelReadinessDetailsTable.defaultProps = {
  modalType: '',
};

UserTravelReadinessDetailsTable.defaultProps = {
  documentId: '',
};

UserTravelReadinessDetailsTable.defaultProps = {
  passports: [],
  visas: [],
};

export default withLoading(UserTravelReadinessDetailsTable);