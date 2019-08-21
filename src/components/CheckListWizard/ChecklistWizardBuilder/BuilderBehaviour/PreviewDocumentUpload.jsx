import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios, { CancelToken } from 'axios';
import { successMessage, errorMessage } from '../../../../helper/toast';
import Helper from '../BuilderOptions/helper';
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
      fileName: '',
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
    fd.readAsDataURL(file);
    const { defaults: { headers: { common } } } = axios; 
    const token = common.Authorization;
    try {
      delete common['Authorization'];
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

      this.setState({
        result: pdfData.secure_url,
        fileName: file.name, 
      }, () => {
        const { result } = this.state;
        successMessage('PDF uploaded successfully');
        handleBehaviour('', result);
      }); 
    } catch(err) {
      errorMessage('PDF Upload Cancelled');
    } finally {
      this.setState({
        uploading: false
      });
      common.Authorization = token; 
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
    const { result, fileName } = this.state;
    return result ? (
      <div className="result-div">
        <div className="file-name">{fileName}</div>
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
          onKeyDown={Helper.disableInputUndoActions}
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
  handleBehaviour: PropTypes.func.isRequired,
};

export default PreviewDocumentUpload;
