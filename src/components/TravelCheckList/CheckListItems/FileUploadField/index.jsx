import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';
import toast from 'toastr';
import Modal from '../../../modal/Modal';
import documentIcon from '../../../../images/icons/uploaded-document.svg';
import SelectionMenu from '../../../SelectionMenu';
import './FileUploadField.scss';

class FileUploadField extends Component {
  state = {
    showDropDown: false,
    showDocument: false,
    fileName: ''
  };
  btnRef = React.createRef();

  componentDidMount = () => {
    const {
      checklistItem: {
        submissions: [item]
      }, fileUploads
    } = this.props;
    const uploadFileName = item && item.userUpload.fileName;
    uploadFileName &&
      this.setState({ showDocument: true, fileName: uploadFileName });
  };

  componentWillReceiveProps = nextProps => {
    const { imageName } = this.state;
    const {
      checklistItem: { submissions: [item]}, fileUploads: { uploadSuccess },
      checkId
    } = nextProps;
    const uploadFileName = item && item.userUpload.fileName;
    uploadSuccess.includes(checkId) &&
      imageName &&
      this.setState({ showDocument: true, fileName: imageName });
    !uploadFileName && this.setState({ showDocument: false });
    if(this.btnRef && this.btnRef.current) this.btnRef.current.value = null;
  };

  toggleDropDown = () => {
    const { itemType } = this.props;
    if (itemType === 'travelTicket') {
      this.btnRef.current.click();
    } else {
      this.setState({ showDropDown: true });
      document.addEventListener('click', this.hideDropdownItems);
    }
  };

  hideDropdownItems = () => {
    this.setState({
      showDropDown: false
    });
    document.removeEventListener('click', this.hideDropdownItems);
  };

  selectFromComputer = () => {
    this.btnRef.current.click();
  };

  selectFromVerified = () => {
    const { openModal, checkId } = this.props;
    openModal(true, `modal-${checkId}`);
  };

  handleFileUpload = async (
    file,
    checklistItemId,
    tripId,
    checkId,
    requestId
  ) => {
    const token = localStorage.getItem('jwt-token');
    const { uploadFile, ocrScan } = this.props;
    delete axios.defaults.headers.common['Authorization'];
    uploadFile(
      file.files[0],
      { checklistItemId, tripId },
      checkId,
      requestId,
      ocrScan
    );
    axios.defaults.headers.common['Authorization'] = token;
  };

  handleFileChange = e => {
    const file = e.target;
    const { name } = file.files[0];
    this.setState({ imageName: name });
    const { checklistItem: { id }, tripId, checkId, requestId
    } = this.props;
    const validateFile = this.checkFileSize(file);
    validateFile && this.handleFileUpload(file, id, tripId, checkId, requestId);
  };

  submitDocument = file => {
    const { tripId, checklistItem: { id }, postSubmission, checkId, requestId
    } = this.props;
    const formData = { tripId, file };
    file &&
      postSubmission({ formData, checklistItemId: id }, checkId, requestId);
  };

  handleVerifiedSubmit = item => {
    const { closeModal } = this.props;
    const { selectedId: documentId, itemData: { itemName, cloudinaryUrl }
    } = item;
    const file = { url: cloudinaryUrl, fileName: itemName, documentId };
    this.setState({ imageName: itemName });
    this.submitDocument(file);
    closeModal();
  };

  handleDeleteFile = () => {
    const file = {};
    this.setState({ imageName: '' });
    this.submitDocument(file);
  };

  handleDownloadFile = () => {
    const {
      checklistItem: {
        submissions: [item]
      },
      downloadAttachments
    } = this.props;
    downloadAttachments(item.userUpload.url, item.userUpload.fileName);
  };

  checkFileSize = (file) => {
    if (file.files[0]) {
      const {size, name} = file.files[0];
      if (size > 1500000) {
        file.value = '';
        toast.error('File must not exceed 1.5mb!');
        return false;
      }
      return true;
    }
    return false; // if no file
  };

  renderInputFile = () => {
    return (
      <input
        type="file"
        name="file"
        ref={this.btnRef}
        className="upload-file"
        accept="image/x-png,image/gif,image/jpeg,application/pdf"
        onChange={this.handleFileChange}
      />
    );
  };

  renderDeleteButton = (showDocument, hideUploadButton) => {
    return (
      showDocument && (
        <div className={` ${hideUploadButton ? 'show-in-duo' : ''}`}>
          <button
            type="button"
            className="action-btn"
            onClick={() => this.handleDeleteFile()}
          >
            Delete File
          </button>
        </div>
      )
    );
  };

  renderDownloadButton = (showDocument, hideUploadButton) => {
    return (
      showDocument && (
        <div className={` ${hideUploadButton ? 'show-in-duo' : ''}`}>
          <button
            type="button"
            className="action-btn"
            onClick={() => this.handleDownloadFile()}
          >
            Download
          </button>
        </div>
      )
    );
  };

  renderApprovedDocumentsModal = () => {
    const {
      closeModal, shouldOpen, userReadinessDocument, modalType, checkId
    } = this.props;
    let documentsArray = [];
    _.values(userReadinessDocument).map(allDocument =>
      allDocument.map(file => {
        if (file.isVerified) {
          const {
            data: { imageName: itemName, ...rest },
            ...others
          } = file;
          const item = { data: { itemName, ...rest }, ...others };
          documentsArray.push(item);
        }
      })
    );
    return (
      <Modal
        customModalStyles="travelSubmission--select__modal"
        closeModal={closeModal}
        width="413px"
        visibility={
          shouldOpen && modalType === `modal-${checkId}`
            ? 'visible'
            : 'invisible'
        }
        title="Select Document"
      >
        {documentsArray.length?(
          <SelectionMenu
            dataArray={documentsArray}
            handleSubmit={this.handleVerifiedSubmit}
          />
        ): (
          <div className="no-verified">You have no verified documents</div>
        )}
      </Modal>
    );
  };

  renderUploadButton = () => {
    const { showDropDown, showDocument, fileName } = this.state;
    const { checklistItem, hideUploadButton, ocrScan, itemType } = this.props;
    let buttonName;
    buttonName = /visa/.test(checklistItem.name.toLowerCase())
      ? 'UPLOAD VISA'
      : 'UPLOAD FILE';
    buttonName = /passport/.test(checklistItem.name.toLowerCase())
      ? 'UPLOAD PASSPORT'
      : buttonName;
    buttonName = showDocument ? fileName : buttonName;
    buttonName = itemType === 'travelTicket' ? 'UPLOAD TICKET' : buttonName;
    const visible = showDropDown ? 'flex' : 'none';
    return (
      <div className={`upload-button ${hideUploadButton ? 'show-in-duo' : ''}`}>
        <button
          type="button"
          className={`upload-btn${showDocument ? '__uploaded' : ''}`}
          onClick={() => this.toggleDropDown()}
        >
          <img src={documentIcon} alt="file" />
          <p>{buttonName}</p>
        </button>
        <div className="upload-section" style={{ display: visible }}>
          {!ocrScan && (
            <button
              className="from-uploads"
              type="button"
              onClick={() => this.selectFromVerified()}
            >
              Verified Document(s)
            </button>
          )}
          <button
            className="from-computer"
            type="button"
            onClick={() => this.selectFromComputer()}
          >
            Upload from Computer
          </button>
          {this.renderInputFile()}
        </div>
        {!ocrScan && this.renderApprovedDocumentsModal()}
      </div>
    );
  };
  render() {
    const { showDocument } = this.state;
    const { hideUploadButton } = this.props;
    return (
      <Fragment>
        {this.renderUploadButton()}
        <div className="checklist-upload-field">
          {this.renderDeleteButton(showDocument, hideUploadButton)}
          {this.renderDownloadButton(showDocument, hideUploadButton)}
        </div>
      </Fragment>
    );
  }
}

FileUploadField.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  shouldOpen: PropTypes.bool,
  checklistItem: PropTypes.object.isRequired,
  downloadAttachments: PropTypes.func.isRequired,
  checkId: PropTypes.string.isRequired,
  tripId: PropTypes.string.isRequired,
  requestId: PropTypes.string.isRequired,
  postSubmission: PropTypes.func.isRequired,
  userReadinessDocument: PropTypes.object,
  modalType: PropTypes.string,
  itemType: PropTypes.string.isRequired,
  ocrScan: PropTypes.bool,
  hideUploadButton: PropTypes.bool,
  fileUploads: PropTypes.object.isRequired
};

FileUploadField.defaultProps = {
  openModal: () => {},
  closeModal: () => {},
  shouldOpen: false,
  ocrScan: false,
  hideUploadButton: false,
  modalType: '',
  userReadinessDocument: {}
};

export default FileUploadField;
