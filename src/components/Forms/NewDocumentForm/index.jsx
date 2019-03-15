import React, { PureComponent } from 'react';
import {PropTypes} from 'prop-types';
import axios from 'axios';
import toast from 'toastr';
import { Input, FormContext } from '../FormsAPI';
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
      isSubmitting: false,
      uploadProgress: 0,
    };
    this.state = {...this.defaultState};
  }

  validate = (field = 'name') => {
    let { values, errors } = this.state;
    [errors, values] = [{ ...errors }, { ...values }];
    let hasBlankFields = false;
    !values[field]
      ? (errors[field] = 'This field is required')
      : (errors[field] = '');

    hasBlankFields = Object.keys(values).some(key => !values[key]);
    const fileNameRegex = /(^[A-Za-z])(.+)$/;
    if(values[field] && !fileNameRegex.test(values[field])) {
      errors[field] = 'File name must start with an alphabet';
      // set to true to disable 'save' button
      hasBlankFields = true;
    }
    this.setState(prevState => {
      return { ...prevState, errors, hasBlankFields };
    });
    return !hasBlankFields;
  };

  handleCancel = () => {
    const { closeModal } = this.props;
    this.setState({ ...this.defaultState });
    closeModal();
  };

  handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const documents = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!documents.includes(file.type)) {
      return toast.error('Incorrect file type uploaded');
    }
    if (file.size> 10**7*2){
      return toast.error('Incorrect file size uploaded');
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.setState(
        prevState =>
          ({hasBlankFields: false,
            values:
            {
              ...prevState.values,
              name: (file.name).replace(/\.[^/.]+$/, ''),
              file: fileReader.result
            },
          }),
        this.validate
      );
    };
    fileReader.readAsDataURL(file);
  };

  handleUploadProgress = e => this.setState({ uploadProgress: e.loaded/e.total});

  handleSubmit = async event => {
    const { values } = this.state;
    this.setState({ hasBlankFields: true, isSubmitting: true });
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
        const uploadedDoc = await axios
          .post(process.env.REACT_APP_CLOUNDINARY_API, 
            formData, { onUploadProgress: this.handleUploadProgress});

        cloudinaryUrl = uploadedDoc.data.secure_url;
        publicId = uploadedDoc.data.public_id;

        this.setState({ isSubmitting: false, uploadProgress: 0 });
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
      this.setState({ hasBlankFields: false, isSubmitting: false, uploadProgress: 0 });
    }
  };

  renderFileSelection = () => (
    <div className="document-input__input-container">
      <label className="document-input__input-container__prompts" htmlFor="select-file">
        <img
          src={documentUpload}
          alt="Document Upload" className="document-input__input-container__prompts__img" />
        <div className="document-input__input-container__prompts__text"><p>Upload File</p></div>
        <input type="file" onChange={this.handleUpload} id="select-file" />
      </label>
    </div>
  );

  render() {
    const { errors, values, hasBlankFields, isSubmitting, uploadProgress } = this.state;
    const { isUploading } = this.props;
    return (
      <FormContext
        targetForm={this} errors={errors} values={values}
        validatorName="validate"// uses default validator if this is undefined
      >
        <form onSubmit={this.handleSubmit}>
          <div className="add-file">Add File</div>
          <div className="document-input">
            { this.renderFileSelection() }
            { isSubmitting && <progress className="progress-bar" value={uploadProgress} max={1} /> }
            <div className="file-errors">
              <span>Allowed files: *jpeg, *pdf, *png</span>
              <span id="size">Max size: 10mb</span>
            </div>
          </div>
          <Input
            type="text"
            name="name"
            label="Name"
          />
          <SubmitArea
            hasBlankFields={hasBlankFields} onCancel={this.handleCancel}
            loading={isSubmitting || isUploading} />
        </form>
      </FormContext>
    );
  }
}

NewDocumentForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired,
};

export default NewDocumentForm;
