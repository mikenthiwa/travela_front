import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cancelIcon from "../../images/cancel.svg";
import deleteIcon from "../../images/document-delete.svg";
import downloadIcon from "../../images/save_alt_24px.svg";
import editIcon from "../../images/edit.svg";

class DocumentTableMenu extends PureComponent {
  openDeleteModal = documentId => () => {
    const { toggleMenu, setItemToDelete, document } = this.props;
    setItemToDelete(documentId, document.name)();
    toggleMenu(document);
  };

  handleOpenRenameModal = () => {
    const { document, editDocument, openModal } = this.props;
    editDocument(document);
    openModal("rename document");
  };

  handleOpenDownloadModal = () => {
    const { openModal, document } = this.props;
    openModal("download document", document);
  };

  renderEllipsis = (toggleMenu, document) => {
    return (
      <i
        className="fa fa-ellipsis-v"
        id="toggleIcon"
        role="presentation"
        onClick={() => toggleMenu(document)}
      />
    );
  };

  closeMenu = (toggleMenu, document) => {
    return (
      <li
        className="table__menu-list-item cancel"
        id="toggleButton"
        onClick={() => toggleMenu(document)}
        role="presentation"
      >
        <img src={cancelIcon} alt="cancel-icon" className="menu-icon" />
        Cancel
      </li>
    );
  };

  renderDocumentDeleteBtn = () => {
    const { document } = this.props;
    return (
      <li
        className="table__menu-list-item"
        id="deleteBtn"
        onClick={this.openDeleteModal(document.id)}
        role="presentation"
      >
        <img src={deleteIcon} alt="rename-icon" className="menu-icon" />
        Delete
      </li>
    );
  };

  downloadDocument = () => {
    return (
      <li
        className="table__menu-list-item"
        id="docDownloadBtn"
        onClick={this.handleOpenDownloadModal}
        role="presentation"
      >
        <img src={downloadIcon} alt="rename-icon" className="menu-icon" />
        Download
      </li>
    );
  };

  renderDocumentRenameBtn = () => {
    return (
      <li
        className="table__menu-list-item rename"
        id="docRenameBtn"
        onClick={this.handleOpenRenameModal}
        role="presentation"
      >
        <img src={editIcon} alt="rename-icon" className="menu-icon" />
        Rename
      </li>
    );
  };

  renderMenu = () => {
    const { toggleMenu, document, menuOpen } = this.props;
    const openMenu = menuOpen.id === document.id && menuOpen.open;

    return (
      <div>
        {this.renderEllipsis(toggleMenu, document)}
        <div className={`table__menu-container ${openMenu ? "open" : ""}`}>
          <ul className="table__menu-list doc">
            {this.renderDocumentDeleteBtn()}
            {this.downloadDocument()}
            {this.renderDocumentRenameBtn()}
            {this.closeMenu(toggleMenu, document)}
          </ul>
        </div>
      </div>
    );
  };

  render() {
    return <div className="menu__container">{this.renderMenu()}</div>;
  }
}

const propTypes = {
  editDocument: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  menuOpen: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  setItemToDelete: PropTypes.func.isRequired
};

DocumentTableMenu.propTypes = { ...propTypes };

export default DocumentTableMenu;
