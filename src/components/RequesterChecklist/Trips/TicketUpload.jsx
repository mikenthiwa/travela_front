import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import fileSaver from 'file-saver';
import documentIcon from '../../../images/icons/uploaded-document.svg';
import { errorMessage } from '../../../helper/toast';
import Preloader from '../../Preloader/Preloader';

class TicketUpload extends Component {

  state = {
    uploading: false,
    deleting: false,
  }

  inputRef = React.createRef();

  handleChange = async (event) => {
    const { handleTicketUpload } = this.props;
    const file = event.target.files[0];
    if (!file) return;
    const fd = new FileReader();
    fd.readAsDataURL(file);
    const token = axios.defaults.headers.common.Authorization;
    delete axios.defaults.headers.common.Authorization;
    try {
      const formData = new FormData();
      formData.set('file', file);
      formData.set('upload_preset', process.env.REACT_APP_PRESET_NAME);
      this.setState({ uploading: true });
      const { data: { secure_url } } = await axios.post(process.env.REACT_APP_CLOUNDINARY_API, formData);
      axios.defaults.headers.common.Authorization = token;
      handleTicketUpload(secure_url);
    } catch(err) {
      /* istanbul ignore next */
      errorMessage('Ticket upload failed');
    } finally {
      this.setState({ uploading: false });
    }
  }

  handleDelete = () => {
    const { handleTicketUpload } = this.props;
    handleTicketUpload('');
    this.inputRef.current.value = '';
  }

  handleDownload = () => {
    const { ticket, id } = this.props;
    fileSaver.saveAs(ticket, `ticket-${id}`);
  }

  renderUploadButton() {
    const { ticket, id } = this.props;
    const { uploading } = this.state;
    
    return (
      <div className="ticket-upload-button-wrapper">
        <label className={`ticket-upload-input-label ${ticket ? 'populated' : ''}`} htmlFor={`ticket-upload-input-${id}`}>
          {ticket && (<img src={documentIcon} alt="document upload succes" />)}
          UPLOAD TICKET
          <input
            type="file"
            accept="image/*"
            id={`ticket-upload-input-${id}`}
            onChange={this.handleChange}
            ref={this.inputRef}
          />
        </label>
        {uploading && (<Preloader />)}
      </div>
    );
  }

  renderDeleteButton() {
    const { ticket } = this.props;
    const { deleting } = this.state;
    return ticket && (
      <div className="ticket-upload-button-wrapper">
        <button 
          type="button"
          className="ticket-upload-button"
          onClick={this.handleDelete}
        >
        DELETE
        </button>
        {deleting && (<Preloader />)}
      </div>
    );
  }

  renderDownloadButton() {
    const { ticket, preview } = this.props;
    const buttonText = preview ? 
      ticket ?  'DOWNLOAD TICKET' : 'NO TICKET UPLOADED'
      : 'DOWNLOAD';

    return (ticket || preview) && (
      <button 
        type="button"
        className="ticket-upload-button"
        onClick={this.handleDownload}
        disabled={preview && !ticket}
      >
        {buttonText}
      </button>
    );
  }

  render() {
    const { preview } = this.props;
    return (
      <div className="ticket-upload-buttons-container">
        {!preview && this.renderUploadButton()}
        {!preview && this.renderDeleteButton()}
        {this.renderDownloadButton()}
      </div>
    );
  }
}

TicketUpload.propTypes = {
  id: PropTypes.string.isRequired,
  ticket: PropTypes.string.isRequired,
  handleTicketUpload: PropTypes.func.isRequired,
  preview: PropTypes.bool.isRequired,
};

export default TicketUpload;
