import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios, { CancelToken } from 'axios';
import { successMessage, errorMessage } from '../../../../helper/toast';
import './index.scss';

class PreviewDocumentUpload extends Component {
  state = {
    pdfFile: '',
    progress: 0, 
    uploading: false,
    result: null
  }

  handleUploadProgress = (e) => {
    this.setState({ 
      progress: e.loaded/e.total
    });
  }

  cancelUpload = () => {
    const { handleBehaviour } = this.props;
    this.cancel && this.cancel();
    this.setState({ 
      pdfFile: '',
      uploading: false
    }, () => {
      const { pdfFile } = this.state;
      handleBehaviour('', pdfFile);
    });
  }

  cancelResult = () => {
    const { handleBehaviour } = this.props;
    this.setState({ 
      pdfFile: '',
      result: null
    }, () => {
      const { pdfFile } = this.state;
      handleBehaviour('', pdfFile);
    });
  }

  onFileChange = async (event) => {
    const { handleBehaviour } = this.props;
    const file = event.target.files[0];
    const fd = new FileReader();
    fd.onload = () => {
      this.setState({ pdfFile: file}, () => {
        const { pdfFile } = this.state;
        handleBehaviour('', pdfFile);
      });
    };
    fd.readAsDataURL(file);
    try {
      delete axios.defaults.headers.common['Authorization'];
      const formData = new FormData();
      formData.set('file', file);
      formData.set('upload_preset', process.env.REACT_APP_PRESET_NAME);
      this.setState({
        uploading: true
      });
      const { data: pdfData } = await axios.post(process.env.REACT_APP_CLOUNDINARY_API, formData, {
        onUploadProgress: this.handleUploadProgress,
        cancelToken: new CancelToken((c) => {
          this.cancel = c;
        })
      });

      this.setState({result: pdfData.secure_url}, () => {
        successMessage('PDF uploaded successfully');
      }); 
    } catch(err) {
      errorMessage('PDF Upload Cancelled');
    } finally {
      this.setState({
        uploading: false
      });
    }
  }

  renderProgress = () => {
    const { progress } = this.state;
    return (
      <div className="show-progress">
        <div className="uploading-title">Uploading...</div>
        <div className="progress-div">
          { <progress className="progress-bar" value={progress*100} max={100} /> }
          <button type="submit" onClick={this.cancelUpload} className="cancel-button">+</button>
        </div>
      </div>
    );
  }

  renderResult = () => {
    const { result, pdfFile } = this.state;
    return result ? (
      <div className="result-div">
        <div className="file-name">{pdfFile.name}</div>
        <div>
          <button type="submit" onClick={this.cancelResult} className="cancel-button">+</button>
        </div>
      </div>
    ): (
      <span className="custom-align">
        <button className="upload-button" type="button">
          Upload file
        </button>
        <input 
          type="file" 
          name="file"
          onChange={this.onFileChange}
          accept="application/pdf"
        />
      </span>
    );
  }
  render() {
    const { uploading } = this.state;
    return (
      <div className="preview-document-input">
        {uploading ? this.renderProgress() :
          this.renderResult()
        }
      </div>
    );
  }
}

PreviewDocumentUpload.propTypes = {
  handleBehaviour: PropTypes.func.isRequired
};

export default PreviewDocumentUpload;
