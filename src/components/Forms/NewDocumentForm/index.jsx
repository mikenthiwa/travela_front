import React, { PureComponent } from 'react';
import {PropTypes} from 'prop-types';
import axios from 'axios';
import { Input, FormContext, getDefaultBlanksValidatorFor } from '../FormsAPI';
import DocumentAPI from '../../../services/DocumentAPI';
import { errorMessage } from '../../../helper/toast';
import SubmitArea from './FormFieldSets/SubmitArea';
import documentUpload from '../../../images/icons/document-upload.svg';
import './NewDocumentForm.scss';

class NewDocumentForm extends PureComponent {
  constructor(props) {
    super(props);
    this.defaultState = {
      values: {
        name: '',
        file: ''
      },
      errors: {},
      hasBlankFields: true,
    };
    this.state = {...this.defaultState};
    this.validate = getDefaultBlanksValidatorFor(this);
  }

  handleCancel = () => {
    const { closeModal } = this.props;
    this.setState({ ...this.defaultState });
    closeModal();
  };

  handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const fileReader = new FileReader();
    if (file) {
      fileReader.onload = () => {
        this.setState(
          prevState => 
            ({ values: 
            {
              ...prevState.values,
              name: (file.name).replace(/\.[^/.]+$/, ''),
              file: fileReader.result
            }
            }),
          this.validate
        );
      };
      fileReader.readAsDataURL(file);
    }
  };

  handleSubmit = async event => {
    const { values } = this.state;
    this.setState({ hasBlankFields: true });
    const { user, createDocument } = this.props;
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', values.file);
    formData.append('upload_preset', process.env.REACT_APP_PRESET_NAME);
    try {
      let cloudinaryUrl;
      let publicId;
      delete axios.defaults.headers.common['Authorization'];
      if (values.file !== '') {
        const uploadedDoc = await axios.post(process.env.REACT_APP_CLOUNDINARY_API, formData);
        cloudinaryUrl = uploadedDoc.data.secure_url;
        publicId = uploadedDoc.data.public_id;
      }
      DocumentAPI.setToken();
      const documentData = {
        name: values.name,
        cloudinary_public_id: publicId,
        cloudinary_url: cloudinaryUrl,
        userId: user.result.userId
      };
      createDocument(documentData);
    } catch (error) {
      errorMessage('Unable to upload document');
      DocumentAPI.setToken();
      this.setState({ hasBlankFields: false });
    }
  }

  render() {
    const { errors, values, hasBlankFields } = this.state;
    return (
      <FormContext
        targetForm={this}
        errors={errors}
        values={values}
        validatorName="validate" // uses default validator if this is undefined
      >
        <form onSubmit={this.handleSubmit}>
          <div className="add-file">Add File</div>
          <div className="document-input">
            <img src={documentUpload} alt="Document Upload" className="document-upload-icon" />
            <div className="upload-file">Upload File</div>
            <input type="file" name="file" onChange={this.handleUpload} id="upload-btn" />
          </div>
          <Input
            type="text"
            name="name"
            label="Name"
          />
          <hr />
          <SubmitArea hasBlankFields={hasBlankFields} onCancel={this.handleCancel} />
        </form>
      </FormContext>
    );
  }
}

NewDocumentForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default NewDocumentForm;
