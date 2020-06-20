import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { isEmpty } from 'lodash';

class FileUploadField extends Component{
  getUrlLink = (name) => {
    const { document:{ data }, modalType, passportInfo:{passportData}} = this.props;
    if ((!isEmpty(data) && modalType && modalType.startsWith('edit') && name === '')){
      const { imageName, cloudinaryUrl } = data;
      let  documentImage = imageName
        ? imageName.length > 40
          ?  `${imageName.substring(0, 40)}...`
          : `${imageName}`
        :cloudinaryUrl.length > 40
          ?  `${cloudinaryUrl.substring(0, 40)}...`
          : `${cloudinaryUrl}`;
      return documentImage;
    }
    if (/add passport/.test(modalType) && !isEmpty(passportData)){
      const {imageLink} = passportData;
      let  documentImage = imageLink.length > 40
        ?  `${imageLink.substring(0, 40)}...`
        : `${imageLink}`;
      return documentImage;
    }
    
    const uploadText = (
      <span className="upload-text">
        Drag file here to upload or
        {' '}
        <span className="upload-text--underline">choose from computer</span>
      </span>
    );
    return (
      name !== ''
        ? name.length > 50
          ? `${name.substring(0, 50)}...`
          : name
        : 'Choose from computer'
    );
  };


  render(){
    const { name, documentUpload, handleUpload} = this.props;
    return  ( 
  
      <div className="document-input__input-container">
        <label className="document-input__input-container__prompts" htmlFor="select-file">
          <div className="document-input__input-container__prompts__img">
            <img
              src={documentUpload}
              alt="Document Upload"  />
          </div>
          <div className="document-input__input-container__prompts__text">
            <p>
              { this.getUrlLink(name)}
            </p>
            <p className="maximum-file-size">Maximum file size - 10MB</p>
          </div>
          <input type="file" onChange={handleUpload} id="select-file" accept="image/jpg, image/png, application/pdf" />
        </label>
      </div>
    );
  }
}

FileUploadField.propTypes = {
  name: Proptypes.string,
  documentUpload: Proptypes.string.isRequired,
  handleUpload: Proptypes.func.isRequired,
  document: Proptypes.object.isRequired,
  modalType: Proptypes.string,
  passportInfo: Proptypes.object.isRequired
};

FileUploadField.defaultProps = {
  name: '',
  modalType: '',
 
};

export default FileUploadField;

