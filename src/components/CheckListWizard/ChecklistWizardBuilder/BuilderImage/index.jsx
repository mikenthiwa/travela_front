import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import DeleteIcon from '../../Shared/deleteIcon';

class ImageOptions extends Component {
  constructor (props) {
    super(props);
    this.initialState = {
      showUrlInput: false,
      uploadedImage: null,
    };
    this.state = { ...this.initialState };
  }

  componentDidUpdate (prevState) {
    const { item: { imageURL } } = this.props;
    prevState.item.imageURL && !imageURL && this.resetState();
  }

  resetState = () => {
    const { showUrlInput, uploadedImage } = this.state;
    (showUrlInput || uploadedImage) && this.setState({ ...this.initialState });
  }

  handleUrlButtonClick = () => {
    this.setState({
      showUrlInput: true,
    });
  }
  
  handleImageUpload = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState({
          uploadedImage: file,
        }, () => this.handleItem(reader.result));
      };
    }
  }
  
  handleItem = value => {
    const { handleItems, item } = this.props;
    handleItems({ ...item, imageURL: value });
  }

  clearUrlInput = () => {
    this.setState({ ...this.initialState }, this.handleItem(''));
  }

  renderUrlInput () {
    const { showUrlInput } = this.state;
    const { item: { id, imageURL } } = this.props;
    return showUrlInput && (
      <div className="checklist builder image url-input">
        <input
          onChange={e => this.handleItem(e.target.value)}
          className="image-upload-url-input"
          type="text" 
          placeholder="Enter image URL"
          value={imageURL || ''}
        />
        <DeleteIcon
          onClick={this.clearUrlInput}
          id={id}
        />
      </div>
    );
  }

  renderUploadName () {
    const { uploadedImage } = this.state;
    return uploadedImage && (
      <div className="checklist builder image upload-name">
        {uploadedImage.name}
        <button className="upload-delete-button" type="button" onClick={this.clearUrlInput}>
          <svg className="close-btn" style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24">
            <path fill="#939CA3" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </button>
      </div>
    );
  }

  renderButtons () {
    const { showUrlInput, uploadedImage } = this.state;
    return !showUrlInput && !uploadedImage && (
      <div className="checklist builder image option">
        <button type="button" className="option-button upload">
          <label htmlFor="checklist-wizard-image-upload">
            Upload
            <input 
              type="file" 
              id="checklist-wizard-image-upload" 
              accept="image/*"
              onChange={this.handleImageUpload}
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

ImageOptions.propTypes = {
  item: PropTypes.object.isRequired,
  handleItems: PropTypes.func.isRequired
};

export default ImageOptions;
