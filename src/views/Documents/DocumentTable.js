import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentItem from './DocumentItem';
import './Documents.scss';

class DocumentTable extends Component {
  renderTableHead() {
    return (
      <tr>
        <th className="mdl-data-table__cell--non-numeric bb-md-0 table__head freeze freeze-head ">
          Name
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100d description-left">
          Date Added
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100d description-left">
          Last Modified
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head table__head--last" />
      </tr>
    );
  }

  render() {
    const {
      documents, menuOpen, toggleMenu,
      openModal, editDocument, setItemToDelete
    } = this.props;
    return (
      <table className="mdl-data-table mdl-js-data-table table__requests">
        <thead>
          {this.renderTableHead()}
        </thead>
        <tbody className="table__body">
          {
            documents.map(document => (
              <DocumentItem
                key={document.id}
                document={document}
                menuOpen={menuOpen}
                toggleMenu={toggleMenu}
                openModal={openModal}
                setItemToDelete={setItemToDelete}
                editDocument={editDocument}
              />
            ))}
        </tbody>
      </table>
    );
  }
}

const documentTablePropTypes = {
  documents: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  setItemToDelete: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  editDocument: PropTypes.func.isRequired,
  menuOpen: PropTypes.object.isRequired,
};

DocumentTable.propTypes = { ...documentTablePropTypes };

export default DocumentTable;
