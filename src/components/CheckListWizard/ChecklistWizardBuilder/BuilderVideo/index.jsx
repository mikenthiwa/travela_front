import React, { Component} from 'react';
import axios, { CancelToken } from 'axios';
import PropTypes from 'prop-types';
import './index.scss';
import DeleteIcon from '../../Shared/deleteIcon';
import { errorMessage, successMessage } from '../../../../helper/toast';

class VideOptions extends Component {
  constructor (props) {
    super(props);
    this.initialState = {
      showUrlInput: false,
      showUploadName: false,
      progress: 0,
      result: '',
      videoFile: ''
    };
    this.state = { ...this.initialState };
  }
  handleUploadProgress = e => this.setState({ progress: e.loaded/e.total});

  handleItem = value => {
    const { handleItems, item } = this.props;
    handleItems({ ...item, videoURL: value });
  }

  onChange = async (e) => {
    const { target: { files: { 0: file}}} = e;
    const fd = new FileReader();
    fd.onload = () => {
      this.setState({ videoFile: file, showUploadName: true }, () => this.handleItem(fd.result));
    };
    fd.readAsDataURL(file);
    try{
      delete axios.defaults.headers.common['Authorization'];
      const formData = new FormData();
      formData.set('file', file);
      formData.set('upload_preset', process.env.REACT_APP_PRESET_NAME);
      const { data: videoData } = await axios.post(process.env.REACT_APP_CLOUNDINARY_API.replace('image', 'video'), formData, {
        onUploadProgress: this.handleUploadProgress,
        cancelToken: new CancelToken((c) => {
          this.cancel = c;
        })
      });
      this.setState({result: videoData.secure_url, progress: 0}, () => {
        const { result } = this.state;
        successMessage('Video Uploaded !');
        result != '' && this.handleItem(result);
      }); 
    }catch(err){
      errorMessage('Video Upload failed');
    }
  }

  cancelUpload = () => {
    this.cancel && this.cancel();
    this.clearUrlInput();
  } 

  renderProgress = () => {
    const { progress } = this.state;
    return (
      <div className="upload-container">
        <div className="uploading-title">Uploading...</div>
        <div className="progress-div">
          { <progress className="progress-bar" value={progress*100} max={100} /> }
          <button type="submit" onClick={this.cancelUpload} className="cancelButton">+</button>
        </div>
      </div>
    );
  }

  handleUrlButtonClick = () => {
    this.setState({
      showUrlInput: true,
    });
  }

  clearUrlInput = () => {
    this.setState({ ...this.initialState }, this.handleItem(''));
  }


  renderUrlInput () {
    const { showUrlInput } = this.state;
    return showUrlInput && (
      <div className="checklist builder video url-input">
        <input
          onChange={e => this.handleItem(e.target.value)}
          className="video-upload-url-input"
          type="text" 
          placeholder="Enter video URL"
        />
        <DeleteIcon
          onClick={this.clearUrlInput}
        />
      </div>
    );
  }

  renderUploadName () {
    const { showUploadName, videoFile, progress } = this.state;
    return showUploadName && (
      <div className="checklist builder video upload-name">
        { !progress ? videoFile.name: this.renderProgress() }
        { !progress && 
          (
            <button className="upload-delete-button" type="button" onClick={this.clearUrlInput}>
              <svg className="close-btn" style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24">
                <path fill="#939CA3" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
              </svg>
            </button>
          )
        }
      </div>
    );
  }

  renderButtons () {
    const { showUrlInput, showUploadName } = this.state;
    return !showUrlInput && !showUploadName && (
      <div className="checklist builder video option">
        <button type="button" className="option-button upload">
          <label htmlFor="checklist-wizard-video-upload">
            Upload
            <input 
              type="file" 
              id="checklist-wizard-video-upload" 
              accept="video/*"
              onChange={this.onChange}
            />
          </label>
        </button>
        <button
          type="button"
          className="option-button url"
          onClick={this.handleUrlButtonClick}
        >
          Enter URL
        </button>
      </div>
    );
  }

  render () {
    return (
      <div className="builder image wrapper">
        {this.renderUploadName()}
        {this.renderUrlInput()}
        {this.renderButtons()}
      </div>
    );
  }
}

VideOptions.propTypes = {
  item: PropTypes.object.isRequired,
  handleItems: PropTypes.func.isRequired
};

export default VideOptions;
