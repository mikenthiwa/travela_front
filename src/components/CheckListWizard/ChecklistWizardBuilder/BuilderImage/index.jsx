import React, { Component, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './index.scss';
import DeleteIcon from '../../Shared/deleteIcon';
import { errorMessage } from '../../../../helper/toast';

class ImageOptions extends Component {
  
  state = {
    showUrlInput: false,
    uploading: false,
  };

  componentDidUpdate (prevState) {
    const { item: { imageURL } } = this.props;
    prevState.item.imageURL && !imageURL && this.resetState();
  }

  resetState = () => {
    const { showUrlInput, uploadedImage } = this.state;
    (showUrlInput || uploadedImage) && this.setState({ showUrlInput: false, uploading: false });
  }

  handleUrlButtonClick = () => {
    this.setState({
      showUrlInput: true,
    });
  }


  handleImageUpload = async (event) => {
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
      this.handleItem(secure_url);
    } catch(err) {
      errorMessage('Image upload failed');
    } finally {
      this.setState({ uploading: false });
    }
  }
  
  handleItem = (imageURL) => {
    const { handleItems, item } = this.props;
    handleItems({ ...item, imageURL });
  }

  clearUrlInput = () => {
    this.setState({ showUrlInput: false, uploading: false }, this.handleItem(''));
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

  renderButtons () {
    const { showUrlInput, uploading } = this.state;
    return !showUrlInput && (
      <div className="checklist builder image option">
        <button type="button" className="option-button upload">
          <label htmlFor="checklist-wizard-image-upload">
            {uploading ? 'Uploading...' : 'Upload'}
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
