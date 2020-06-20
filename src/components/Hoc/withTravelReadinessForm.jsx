import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import toast from 'toastr';
import axios from 'axios';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { FormContext, getDefaultBlanksValidatorFor } from '../Forms/FormsAPI';
import '../Forms/TravelReadinessForm/TravelDocument.scss';
import DocumentAPI from '../../services/DocumentAPI';
import FileUploadField from '../Forms/TravelReadinessForm/FormFieldsets/FileUploadField';
import SubmitArea from '../Forms/TravelReadinessForm/FormFieldsets/SubmitArea';
import Preloader from '../Preloader/Preloader';
import documentUpload from '../../images/icons/document-upload-blue.svg';
import { isOptional } from '../Forms/FormsAPI/formValidator';
import * as otherDocumentUtils from '../../helper/otherDocumentsUtils';


export default function TravelReadinessForm (FormFieldSet, documentType, defaultFormState) {
  class BaseForm extends Component {
    constructor(props) {
      super(props);
      this.state = {...defaultFormState, imageChanged: false};
      this.validate = getDefaultBlanksValidatorFor(this);
    }

    componentDidMount(){
      const {modalType, passportInfo:{passportData}} = this.props;
      if(/add passport/.test(modalType)){
        if (/add/.test(modalType) && !isEmpty(passportData)){
          this.scanUpdatePopulates(passportData, modalType);
        }}
    }
     
    componentWillReceiveProps(nextProps) {
      const { errors, document, modalType, passportInfo: {passportData}} = nextProps;
      const {id} = document;
      if(/edit/.test(modalType) && !isEmpty(document)){
        const {showPassportForm}  = nextProps;
        const {showPassportForm : showMyForm } = this.props;
        if( showMyForm !== showPassportForm){
          this.scanUpdatePopulates(passportData, modalType, id);
        }else{
          return this.updateFormFields(document);
        }
      }
      if (/add passport/.test(modalType) && !isEmpty(passportData)){  
        this.scanUpdatePopulates(passportData, modalType);
      }
      return this.setState({errors, uploadingDocument: false, scanning: false});
    }

    componentWillUnmount() {
      const {fetchUserData, user} = this.props;
      fetchUserData(user.currentUser.userId);
    }

    updateFormFields = (document) => {
      const { data } = document;
      return this.setState(prevState => {
        const newValues = { ...prevState.values, ...data };
        return { ...prevState, id: document.id, values: {...newValues}, imageChanged:true, hasBlankFields:false };
      });
    }

    scanUpdatePopulates = (passportData, modalType, id) => {
      const {nationality, number, birthDay, expires, dateOfIssue, country, surname, imageLink} = passportData;
      const document = {
        data:{ name: surname,
          passportNumber: number,
          nationality,
          dateOfBirth: moment(birthDay).format( 'MM/DD/YYYY'),
          dateOfIssue:  moment(dateOfIssue).format( 'MM/DD/YYYY'),
          placeOfIssue: country,
          expiryDate:  moment(expires).format( 'MM/DD/YYYY'),
          cloudinaryUrl: imageLink, 
        }
      };
      if (/edit passport/.test(modalType)){
        document['id'] = id;
      }
      return this.updateFormFields(document);
    };

    onCancel = (event) => {
      event.preventDefault();
      const {closeModal} = this.props;
      closeModal();
    };

    handleSubmit = async (event) => {
      event.preventDefault();
      const {values, image, errors, id, secure_url} = this.state;
      const {createTravelReadinessDocument, editTravelReadinessDocument, modalType} = this.props;
      const {dateOfIssue, expiryDate} = values;
      const { name } = this.state;
      if(name){
        values.imageName = name;
      }else{
        const {document: {data: { imageName }}} = this.props;
        values.imageName = imageName;
      }
      const newValues = {
        ...values,
        dateOfIssue: dateOfIssue === '' ? '' :
          moment(dateOfIssue)
            .format( 'MM/DD/YYYY'),
        expiryDate: moment(expiryDate).format(
          'MM/DD/YYYY'
        )
      };
      if (image) {
        try {
          DocumentAPI.setToken();
          const documentValues = {
            ...newValues,
            cloudinaryUrl: secure_url,
          };
          if (/edit/.test(modalType)) {
            return editTravelReadinessDocument(documentType, {...documentValues}, id);
          } else {
            return createTravelReadinessDocument(documentType, {...documentValues});
          }
        } catch (e) {
          toast.error('Error uploading document. Please try again!');
        }
      }
      if (/edit/.test(modalType)) {
        editTravelReadinessDocument(documentType, newValues, id);
      } else {

        createTravelReadinessDocument(documentType, newValues);
      }
      return this.setState({errors: {...errors, cloudinaryUrl: 'Please upload a document'}});
    };

    handleUploadProgress = (e) => this.setState({ uploadProgress: e.loaded/e.total});

    handleUpload = async (e) => {
      e.preventDefault();
      const image = e.target.files[0];
      if( !image );
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(image.type)) {
        return toast.error('Invalid file type. Please upload an image');
      }
      if (image.size > 10**7) {
        e.target.value= '';
        return toast.error('This upload has exceeded the 10 MB limit that is allowed');
      }
      const fd = new FormData();
      fd.append('file', image);
      fd.append('upload_preset', process.env.REACT_APP_PRESET_NAME);
      const {name} = image;
      try {
        delete axios.defaults.headers.common['Authorization'];
        this.setState({uploadingDocument: true, showForm: false});
        const imageData = await axios.post(
          process.env.REACT_APP_CLOUNDINARY_API, fd,
          { onUploadProgress: this.handleUploadProgress
          }
        );
        DocumentAPI.setToken();
        const {data: {secure_url}} = imageData;
        this.setState({secure_url});

        if(documentType === 'other'){
          const { TesseractWorker } = window.Tesseract;
          const worker = new TesseractWorker();
          worker
            .recognize(`${secure_url}`)
            .progress((p) => {
              this.setState({scanning: true, progressCount: p});
            })
            .then((result) => {
              this.setState({uploadingDocument: false, scanning: false, showForm: true, values: {
                name: otherDocumentUtils.documentName(result),
                dateOfIssue: '',
                expiryDate: '',
                documentId: otherDocumentUtils.documentId()
              }, });
            });
        }
        const {scanPassport} = this.props;
        if(documentType === 'passport'){
          scanPassport(secure_url);
        }
        this.setState({
          documentUploaded: true,
          uploadingDocument: false,
          values: {...values, cloudinaryUrl: secure_url}
        });
      } catch (e) {
        toast.error('Error uploading document. Please try again!');
      }
      const { values, optionalFields} = this.state;
      const hasBlankFields = Object.keys(values)
        .some(key => !values[key] && !isOptional(key, optionalFields));
      this.setState({name, image, imageChanged: true, hasBlankFields: hasBlankFields || false });
    };
    
    onChangeVisa = (e) => {
      const visaType = e;
      this.setState((prevState) => {
        if(visaType !== 'Other'){
          delete prevState.values.otherVisaTypeDetails;
          return {
            values: {
              ...prevState.values,
              visaType
            }
          };
        }
        return {
          values: {
            ...prevState.values,
            visaType,
            otherVisaTypeDetails: ''
          }
        };
      }, () =>  this.validate());
    }

    render() {
      const { errors, values, hasBlankFields, uploadingDocument,
        name, imageChanged, uploadProgress, showForm, scanning, progressCount } = this.state;

      const { modalType, document, fetchingDocument, updatingDocument, showPassportForm, retrieving, passportInfo, documentTypes } = this.props;
      const {cloudinaryUrl} = values;
      if (documentType === 'other') delete errors.documentid;
      const { visaType, otherVisaTypeDetails } = values;
      const submitButton = {
        other: 'Add Document',
        visa: 'Add Visa Details',
        passport: 'Add Passport'
      };

      return (
        <div>
          {fetchingDocument ? <Preloader /> : (
            <FormContext values={values} errors={errors} targetForm={this}>
              <form className="travel-document-form" onSubmit={this.handleSubmit}>
                <div className="travel-document-select-file">
                  { documentType === 'other' ?
                    (
                      <p className="attach-document-text">
                        { scanning ? ( `Scanning Image ${(progressCount.status === 'recognizing text') ? (progressCount.progress * 100).toFixed() :  '0'} % `) :
                          `Attach the image of your ${modalType && modalType.split(' ').splice(-1)} document`}
                      </p>
                    ):(
                      <p className="attach-document-text">
                        { retrieving && /passport/.test(modalType)? `Scanning your ${modalType.split(' ').splice(-1)} document to retrieve data` 
                          :`Attach the image or PDF of your ${modalType && modalType.split(' ').splice(-1)} document ensure it is in Landscape`}
                      </p>
                    )}
                  { retrieving &&  /passport/.test(modalType) ?  <Preloader /> :(
                    <FileUploadField
                      name={name}
                      documentUpload={documentUpload}
                      handleUpload={this.handleUpload}
                      document={document}
                      modalType={modalType}
                      passportInfo={passportInfo}
                      cloudinaryUrl={cloudinaryUrl}
                    />)}
                  {uploadingDocument && <progress className="progress-bar" value={uploadProgress} max={1} />}
                </div>


                { documentType === 'other' ?
                  (
                    <div className={!showForm && !(/edit/.test(modalType)) ? 'invisible': 'visible'}>
                      {<FormFieldSet
                        visaType={visaType} onChangeVisa={this.onChangeVisa}
                        values={values} otherVisaTypeDetails={otherVisaTypeDetails}
                        documentTypes={documentTypes} />}
                    </div>
                  ):''
                }

                { documentType === 'passport' ?
                  (
                    <div className={/add passport/.test(modalType) && !showPassportForm ? 'invisible': 'visible'}>
                      {<FormFieldSet
                        visaType={visaType} onChangeVisa={this.onChangeVisa}
                        values={values} otherVisaTypeDetails={otherVisaTypeDetails} />}
                    </div>
                  ):''
                }
                { documentType === 'visa' ? (
                  <div className="visible">
                    <FormFieldSet
                      visaType={visaType} onChangeVisa={this.onChangeVisa}
                      values={values} otherVisaTypeDetails={otherVisaTypeDetails} /> 
                  </div>) : ''}

                <div className="travel-document-submit-area">
                  { scanning ? '' :
                    (
                      <SubmitArea
                        onCancel={this.onCancel} hasBlankFields={hasBlankFields || !imageChanged}
                        send={
                          (modalType && modalType.startsWith('edit')) ? 'Save Changes' :
                            submitButton[documentType]}
                        loading={uploadingDocument}
                        updatingDocument={updatingDocument}
                        modalType={modalType}
                        retrieving={retrieving}
                        showPassportForm={showPassportForm}
                      />
                    )
                  }
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
    modalType: PropTypes.string, fetchingDocument: PropTypes.bool,
    updatingDocument: PropTypes.bool,
    scanPassport: PropTypes.func,
    passportInfo: PropTypes.object,
    showPassportForm: PropTypes.bool,
    retrieving: PropTypes.bool,
    documentTypes: PropTypes.array,
  };

  BaseForm.defaultProps = {
    editTravelReadinessDocument: () => {
    },
    scanPassport: () => {

    },
    document: {},
    modalType: '',
    errors: {},
    fetchingDocument: false,
    updatingDocument: false,
    showPassportForm: false,
    retrieving:false,
    passportInfo:{},
    documentTypes: [],
  };
  return BaseForm;
}
