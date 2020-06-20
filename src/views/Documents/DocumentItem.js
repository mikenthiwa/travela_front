import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import generateDynamicDate from '../../helper/generateDynamicDate';
import fileIcon from '../../images/icons/file_icon.svg';
import imageIcon from '../../images/icons/img_icon.svg';
import DocumentTableMenu from '../../components/DocumentTableMenu';
import './Documents.scss';

const DocumentItem = (props) => {
  const { document, menuOpen, toggleMenu, openModal, setItemToDelete, editDocument } = props;
  const documentExtension = document.cloudinary_url.split('.').pop();
  const documentIcon = ['jpg', 'svg', 'jpeg', 'png', 'bmp'].includes(documentExtension)
    ? imageIcon : fileIcon;
  return (
    <Fragment>
      <tr className="table__rows">
        <td className="mdl-data-table__cell--non-numeric 
                        document__name table__data freeze-role-table">
          <span><img src={documentIcon} alt="file_icon" className="document__icon" /></span>
          {document.name}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data pl-sm-120">
          {generateDynamicDate({}, document.createdAt)}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data pl-sm-120">
          {generateDynamicDate({}, document.updatedAt)}
        </td>
        <td className="mdl-data-table__cell--non-numeric table__data pl-sm-120 data_cell">
          <DocumentTableMenu
            document={document}
            menuOpen={menuOpen}
            toggleMenu={toggleMenu}
            openModal={openModal}
            setItemToDelete={setItemToDelete}
            editDocument={editDocument}
          />
        </td>
      </tr>
    </Fragment>
  );
};

const documentItemPropTypes = {
  document: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  setItemToDelete: PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  menuOpen: PropTypes.object.isRequired,
  editDocument: PropTypes.func.isRequired,
};

DocumentItem.propTypes = { ...documentItemPropTypes };

export default DocumentItem;
