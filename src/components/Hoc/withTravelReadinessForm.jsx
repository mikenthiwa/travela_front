import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import toast from 'toastr';
import axios from 'axios';
import { isEmpty } from 'lodash';
import moment from 'moment';
import {FormContext} from '../Forms/FormsAPI';
import '../Forms/TravelReadinessForm/TravelDocument.scss';
import DocumentAPI from '../../services/DocumentAPI';
import FileUploadField from '../Forms/TravelReadinessForm/FormFieldsets/FileUploadField';
import SubmitArea from '../Forms/TravelReadinessForm/FormFieldsets/SubmitArea';
import Preloader from '../Preloader/Preloader';
import documentUpload from '../../images/icons/document-upload-blue.svg';

export default function TravelReadinessForm (FormFieldSet, documentType, defaultFormState) {
  class BaseForm extends Component {
    constructor(props) {
      super(props);
      this.state = {...defaultFormState, imageChanged: false};
    }

    componentWillReceiveProps(nextProps, nextContext) {
      const {errors, document} = nextProps;
      const {document: currentDocument} = this.props;
      if ((isEmpty(currentDocument) && !isEmpty(document)) && documentType === 'visa') {
        const {country, entryType, visaType, dateOfIssue, expiryDate, cloudinaryUrl} = document.data;
        this.newState = {
          values: {
            country, entryType, visaType,
            dateOfIssue: moment(dateOfIssue),
            expiryDate: moment(expiryDate)
          },
          id: document.id,
          image: cloudinaryUrl,
        };
        this.setState({errors, uploadingDocument: false, ...this.newState});
      } else if ((isEmpty(currentDocument) && !isEmpty(document)) && documentType === 'other') {
        const {name, dateOfIssue, expiryDate, documentId, cloudinaryUrl} = document.data;
        this.newState = {
          values: {
            name,
            dateOfIssue: dateOfIssue === '' ? '' : moment(dateOfIssue),
            expiryDate: moment(expiryDate),
            documentId
          },
          id: document.id,
          image: cloudinaryUrl,
        };
        this.setState({errors, uploadingDocument: false, ...this.newState});
      }
      this.setState({errors, uploadingDocument: false});
    }

    componentWillUnmount() {
      const {fetchUserData, user} = this.props;
      fetchUserData(user.currentUser.userId);
    }

    onCancel = (event) => {
      event.preventDefault();
      const {closeModal} = this.props;
      closeModal();
    };

    handleSubmit = async (event) => {
      event.preventDefault();
      const {values, image, errors, documentUploaded, id} = this.state;
      const {createTravelReadinessDocument, editTravelReadinessDocument, modalType} = this.props;
      const {dateOfIssue, expiryDate} = values;
      const newValues = {
        ...values,
        dateOfIssue: dateOfIssue === '' ? '' :
          moment(dateOfIssue)
            .format(documentType === 'passport' ? 'YYYY/MM/DD' : 'MM/DD/YYYY'),
        expiryDate: moment(expiryDate).format(
          documentType === 'passport' ? 'YYYY/MM/DD' : 'MM/DD/YYYY'
        )
      };
      if (documentType === 'passport') {
        const {dateOfBirth} = values;
        newValues.dateOfBirth = moment(dateOfBirth).format('YYYY/MM/DD');
      }

      if (documentUploaded) {
        if (modalType === `edit ${documentType}`) {
          editTravelReadinessDocument(documentType, newValues, id);
        } else {
          createTravelReadinessDocument(documentType, newValues);
        }
      } else {
        if (image) {
          const fd = new FormData();
          fd.append('file', image);
          fd.append('upload_preset', process.env.REACT_APP_PRESET_NAME);

          try {
            delete axios.defaults.headers.common['Authorization'];
            this.setState({uploadingDocument: true});
            const imageData = await axios.post(
              process.env.REACT_APP_CLOUNDINARY_API, fd,
              { onUploadProgress: this.handleUploadProgress
              }
            );
            const {data: {url}} = imageData;
            this.setState({
              documentUploaded: true,
              uploadingDocument: false,
              values: {...values, cloudinaryUrl: url}
            });
            DocumentAPI.setToken();
            const documentValues = {
              ...newValues,
              cloudinaryUrl: url,
            };

            if (modalType === `edit ${documentType}`) {
              editTravelReadinessDocument(documentType, {...documentValues}, id);
            } else {
              createTravelReadinessDocument(documentType, {...documentValues});
            }
          } catch (e) {
            toast.error('Error uploading document. Please try again!');
          }
        } else {
          this.setState({errors: {...errors, cloudinaryUrl: 'Please upload a document'}});
        }
      }
    };

    handleUploadProgress = (e) => this.setState({ uploadProgress: e.loaded/e.total});

    handleUpload = (e) => {
      e.preventDefault();
      const image = e.target.files[0];
      if (!['image/jpeg', 'image/png'].includes(image.type)) {
        return toast.error('Invalid file type. Please upload an image');
      }
      if (image.size > Math.pow(10, 7)) {
        return toast.error('File is too large');
      }
      const {name} = image;
      this.setState({name, image, imageChanged: true});
    };

    render() {
      const {errors, values, hasBlankFields, uploadingDocument,
        name, imageChanged, uploadProgress} = this.state;
      const { modalType, document, fetchingDocument} = this.props;
      if (documentType === 'other') delete errors.documentid;
      const submitButton = {
        other: 'Add Document',
        visa: 'Add Visa',
        passport: 'Add Passport'
      };
      return (
        <div>
          {fetchingDocument ? <Preloader /> : (
            <FormContext values={values} errors={errors} targetForm={this}>
              <form className="travel-document-form" onSubmit={this.handleSubmit}>
                {<FormFieldSet />}
                <div className="travel-document-select-file">
                  <p>Attach File</p>
                  <FileUploadField
                    name={name}
                    documentUpload={documentUpload}
                    handleUpload={this.handleUpload}
                    document={document}
                    modalType={modalType}
                  />
                  {uploadingDocument && <progress className="progress-bar" value={uploadProgress} max={1} />}
                </div>
                <hr />
                <div className="travel-document-submit-area">
                  <SubmitArea
                    onCancel={this.onCancel} hasBlankFields={hasBlankFields || !imageChanged}
                    send={
                      (modalType.startsWith('edit')) ? 'Save Changes' :
                        submitButton[documentType]}
                    loading={uploadingDocument} />
                </div>
              </form>
            </FormContext>)}
        </div>
      );
    }
  }

  BaseForm.propTypes = {
    errors: PropTypes.object,
    createTravelReadinessDocument: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    fetchUserData: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    editTravelReadinessDocument: PropTypes.func,
    document: PropTypes.object,
    modalType: PropTypes.string, fetchingDocument: PropTypes.bool
  };

  BaseForm.defaultProps = {
    editTravelReadinessDocument: () => {
    },
    document: {},
    modalType: '',
    errors: {},
    fetchingDocument: false
  };
  return BaseForm;
}
