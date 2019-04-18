/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/no-string-refs */
import React, {Component, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import toast from 'toastr';
import InputRender from '../../Forms/FormsAPI';
import Modal from '../../modal/Modal';
import RadioButton from '../../RadioButton';
import ButtonLoadingIcon from '../../Forms/ButtonLoadingIcon';
import check from '../../../images/check.svg';
import downloadIcon from '../../../images/icons/download_file.svg';
import uploadIcon from '../../../images/uploadIcon.svg';
import documentIcon from '../../../images/document-rect.png';
import upload_ticket from '../../../images/upload_ticket.svg';

class SubmissionsUtils extends Component {
  state = { showUploadedField: false, departureDate: null, departureTime: null, arrivalTime: null,
    returnDepartureTime: null, returnTime: null, arrivalDate: null, errors: {}, isValid: true, displayDropdown: false,
    selectedDocumentInfo:''
  };

  componentDidMount() {
    const { checklistItem: {submissions: [item]}, checkId } = this.props;
    this.getItemValue( item, checkId);
    this.initializeDates(this.props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { checkId, checklistItem: {submissions: [item]}, setUploadedFile, postSuccess } = nextProps;
    if(item && item.value.fileName) {
      setUploadedFile(item.value.fileName, item.value.url, item.createdAt );
    }
    const { checklistItem: {submissions: [prevItem]}} = this.props;
    if(item && !prevItem){
      this.getItemValue( item, checkId);
    }
    postSuccess.includes(checkId) && item && this.setState({showUploadedField: true});
    this.initializeDates(nextProps);
  }

  initializeDates = (props) => {
    const {trip, departureTime, arrivalTime, returnDepartureTime, returnTime} = props;
    this.setState({ departureDate: this.formatDateTime(trip.departureDate),
      departureTime:  this.formatDateTime(departureTime || trip.departureDate),
      arrivalTime: this.formatDateTime(arrivalTime || trip.departureDate),
      returnDepartureTime: this.formatDateTime(returnDepartureTime || trip.returnDate),
      returnTime: this.formatDateTime(returnTime || trip.returnDate),
      arrivalDate: this.formatDateTime(trip.returnDate),
    });
  };

  getItemValue = (item, checkId) => {
    const { utilsType, setTextArea, setTicketFields, setUploadedFileName } = this.props;
    utilsType.match('textarea') && item && setTextArea(item.value, checkId);
    utilsType.match('ticketFieldset') && item && setTicketFields(item.value, checkId);
    utilsType.match('uploadField') && item &&
    setUploadedFileName(item.value.fileName, item.createdAt, checkId, item.value.url);
  }

  renderTextarea = () => {
    const { itemsToCheck, checkId, submissionText, handleTextAreaSubmit } = this.props;

    return (
      <div className="travelSubmission--item__textarea">
        <textarea
          placeholder="input information here..." name="submissionText" rows="4" cols="80"
          className="textArea" value={submissionText} onChange={this.handleInputChange}
          type="submit" onBlur={handleTextAreaSubmit}
        />
        {
          itemsToCheck.includes(checkId) && (
            <img
              src={check} alt="check_icon"
              className="travelCheckList--input__check-image__ticket visible" />
          )}
      </div>
    );
  };
  handleRadioSubmit = () => {
    const { selectedDocumentInfo } = this.state;
    const { submitAttachedDocument} = this.props;
    const document = selectedDocumentInfo.split(',');
    const url = document[1];
    const fileName = document[0];
    const id = document[2];
    submitAttachedDocument(url, fileName, id);
  };

  selectRadioButton = event => {
    const document = event.target.value;
    this.setState({
      selectedDocumentInfo: document
    });
  };

  renderRadioButton = (file) => {
    const { id, data: { imageName, cloudinaryUrl }, updatedAt } = file;
    const { selectedDocumentInfo } = this.state;
    return (
      <div className="travelSubmission--radio" onChange={this.selectRadioButton} key={id}>
        <RadioButton
          key={id}
          name={(
            <span className="travelSubmission--select__modal-option">
              <span className="travelSubmission--select__modal-image">
                <img
                  src={documentIcon}
                  className="travelSubmission--select__modal-image--letter" alt="document"
                />
              </span>
              <span className="travelSubmission--select__modal-text">
                <span>{imageName}</span>
                <br />
                <span>
                      Uploaded
                  {' '}
                  {moment(updatedAt).format('DD-MM-YY')}
                </span>
              </span>
            </span>)}
          value={`${imageName},${cloudinaryUrl},${id}`}
          id={file.id}
          defaultChecked={selectedDocumentInfo === `${imageName},${cloudinaryUrl},${id}`}
        />
      </div>
    );
  };

  renderAttachButton = () => {
    const { fileUploadData: { isUploading }, submitAttachedDocument, hasSelectedDocument, uploadProcess } = this.props;
    const loading = isUploading ? true : false;
    const { selectedDocumentInfo } = this.state;
    return (
      <div className="travelSubmission--select__modal-foot">
        <button
          id="attach-button"
          type="button"
          disabled={selectedDocumentInfo ? false : true}
          onClick={() => {this.handleRadioSubmit();}}
        >
          <ButtonLoadingIcon isLoading={loading} buttonText="Attach" />
        </button>
      </div>
    );
  };

  renderTravelDocumentList = (documentArray) => {
    return (
      <form>
        <div className="travelSubmission--select__modal-content-body">
          {
            documentArray.map(file => this.renderRadioButton(file))
          }
        </div>
        {this.renderAttachButton()}
      </form>
    );
  }

  renderUserDocumentModalUpload = () => {
    const {
      closeModal, shouldOpen, modalType,
      userReadinessDocument, checkId
    } = this.props;
    let documentArray = [];
    const uploadedDocument = _.values(userReadinessDocument).map(allDocument =>
      allDocument.map(specificDocument => specificDocument.isVerified && documentArray.push(specificDocument)));
    return(
      <Modal
        customModalStyles="travelSubmission--select__modal"
        closeModal={closeModal}
        width="413px"
        visibility={
          shouldOpen && modalType === `modal-${checkId}`
            ? 'visible'
            : 'invisible'
        }
        title="Select Document"
      >
        { _.isEmpty(documentArray) ?
          (
            <div className="travelSubmission--select__no-document">
            You have no verified travel document
            </div>
          )
          :(
            <div>
              {this.renderTravelDocumentList(documentArray)}
            </div>
          )}
      </Modal>
    );
  }

  selectFromComputer = () => {
    this.refs.fileUploader.click();
    this.toggleDropdownDisplay();
  }

  toggleDropdownDisplay = () => {
    const { displayDropdown: display } = this.state;
    this.setState({
      displayDropdown: !display
    });
  }

  handleShowDocumentsModal = () => {
    const { handleUserDocumentUpload, checkId } = this.props;
    this.toggleDropdownDisplay();
    handleUserDocumentUpload(`modal-${checkId}`);
  }

  selectDocumentDropdowndown = () =>{
    const { displayDropdown } = this.state;
    const {checklistItem: { name } } = this.props;
    const visible = displayDropdown ? 'block' : 'none';
    return (
      name === 'Travel Ticket' ? (
        <button className="from-computer" onClick={this.selectFromComputer} type="button">
          <img src={upload_ticket} alt="upload_image" className="upload_ticket" />
            Upload Ticket Image
        </button>
      ): (
        <div className="travelSubmission--select">
          <button type="button" onClick={this.toggleDropdownDisplay} className="travelSubmission--select__button">
            Select Document
          </button>
          <div className="travelSubmission--select__upload-modal " style={{display:visible}}>
            <button className="from-uploads" onClick={()=> this.handleShowDocumentsModal()} type="button">
            Verified Document(s)
            </button>
            <button className="from-computer" onClick={this.selectFromComputer} type="button">
            Upload from Computer
            </button>
          </div>
          {this.renderUserDocumentModalUpload()}
        </div>
      ));
  }

  renderUploadField = () => {
    const { fileUploadData, itemsToCheck, checklistItem: { name }, checkId, handleUpload} = this.props;
    return (
      <div className="travelSubmission--input__upload-field">
        {this.selectDocumentDropdowndown()}
        <input
          type="file" name="file" ref="fileUploader" className="uploadFile"
          onChange={handleUpload} disabled={fileUploadData.isUploading} accept="image/x-png,image/gif,image/jpeg,application/pdf"
        />
        {
          itemsToCheck.includes(checkId) && name !== 'Travel Ticket' && (
            <img
              src={check} alt="check_icon"
              className="travelCheckList--input__check-image__ticket visible"
            />
          )
        }
      </div>
    );
  };


  renderUploadedField = () => {
    const { itemsToCheck, checkId, uploadedFileName, handleUpload,checklistItem: {submissions: [item]}, setUploadedFile,
      fileUploadData: { isUploading, cloudinaryUrl, uploadSuccess }, uploadedFileDate, uploadProcess, uploadedFileUrl } = this.props;
    const isPdf = uploadedFileName.substr(-3) ==='pdf';
    let cloudinaryLink =  uploadSuccess === checkId && cloudinaryUrl;
    const imageUrl = cloudinaryLink ? cloudinaryLink: uploadedFileUrl;
    const fileName = (!uploadProcess || uploadedFileDate) && uploadedFileName;
    const fileDate = (!uploadProcess || uploadProcess.match('success')) && uploadedFileDate;
    return (
      <div className="travelSubmission--input__upload-field__">
        {(!uploadProcess || uploadedFileDate) &&
        (
          <div className="travelSubmission--input__input-field__">
            {isPdf ? (
              <embed
                src={`${imageUrl}#toolbar=0&statusbar=0&page=1`}
                alt="document"
                className="travelSubmission--input__input-field__image"
                type="application/pdf"
              />
            ): 
              <img src={imageUrl} alt="document" className="travelSubmission--input__input-field__image" />}
            <div role="presentation" className="travelSubmission--input__btn--">
              <div id="file-upload" role="presentation" className="travelSubmission--input__btn--uploadedFileName">
                {fileName}
              </div>
              {fileDate &&(
                <Fragment>
                  <div className="travelSubmission--input__btn--uploadedFileDate">
             Uploaded
                    {' '}
                    {moment(new Date(fileDate)).format('DD-MM-YY')}
                  </div>
                  <div>
                    <a href={uploadedFileUrl} target="_blank">
                      <img src={downloadIcon} alt="upload_icon" className="travelSubmission--input__image" />
                    </a>
                  </div>
                </Fragment>
              )}
            </div>
            <input
              type="file" name="file" className="uploadedFile"
              onChange={handleUpload} disabled={isUploading} />
          </div>
        )}
      </div>
    );
  };

  handleInputChange = (event) => {
    event.preventDefault();
    const {target: {name, value, type}} = event;
    const {handleInputChange} = this.props;
    this.setState({[name]: value});
    handleInputChange(name, value);
    if (type === 'datetime-local') {
      this.setState({isValid: this.validateDates(name, value)});
    }
  };

  validateDates = (name, value) => {
    const fields = ['departureDate', 'departureTime',
      'arrivalTime'];
    const { tripType } = this.props;
    if( tripType === 'return'){
      fields.push('returnDepartureTime', 'returnTime');
    }
    const values = {...this.state, [name]: value};
    let allValid = true;
    for (let i = 1; i < fields.length; i++) {
      const max = i === fields.length - 1 ? null : fields[i + 1];
      if (!this.validateDate(fields[i],
        values[fields[i]], values[fields[i - 1]], max && values[max])) {
        allValid = false;
      }
    }
    return allValid;
  };

  validateDate = (name, value, min, max) => {
    const valid = (min ? moment(value).isSameOrAfter(moment(min)) : true) &&
    (max ? moment(value).isSameOrBefore(moment(max)) : true);
    this.setState((prevState) => ({
      errors: { ...prevState.errors,
        [name]: !valid ? 'Inconsistent date. Please check again!' : null
      }
    }));
    return valid;
  };

  handleTicketSubmit = () => {
    const {handleTicketSubmit} = this.props;
    handleTicketSubmit();
  };

  renderTicketInput = (type, placeholder, label, name, tripId, value, min = null, max = null) => {
    const {errors} = this.state;
    return (
      <div className="airline-name">
        <span id="label">{label}</span>
        <input
          id={`${name}-${tripId}`} type={type} value={value || ''}
          onChange={this.handleInputChange} onBlur={this.handleTicketSubmit}
          name={name} placeholder={placeholder} className={name} min={min} max={max}
        />
        {
          errors[name] && <div className="submission-progress__error">{errors[name]}</div>
        }
      </div>
    );
  };

  renderTicketFieldset = () => {
    const { checklistItem, itemsToCheck, tripType, airline, ticketNumber,
      checkId, returnTicketNumber, returnAirline } = this.props;
    const {name, submissions: {tripId}} = checklistItem;
    const { departureDate, departureTime, arrivalTime,
      returnDepartureTime, returnTime, arrivalDate } = this.state;
    return (
      name.toLowerCase().includes('travel ticket') &&
      (
        <form className="ticket-submission" autoComplete="off">
          <div className="ticket-submission--ticket__fieldSet">
            <div className="travel-submission-details__return" id="departure-fields">
              {this.renderTicketInput('datetime-local', '19:35:00', 'Departure Time',
                'departureTime', tripId, departureTime, this.formatDateTime(departureDate),
                this.formatDateTime(arrivalDate)
              )}
              {this.renderTicketInput('datetime-local', '19:35:00', 'Arrival Time',
                'arrivalTime', tripId, arrivalTime, this.formatDateTime(departureTime),
                this.formatDateTime(returnDepartureTime),
              )}
              {this.renderTicketInput('text', 'e.g KQ 532', 'Flight Number',
                'ticketNumber', tripId, ticketNumber
              )}
              {this.renderTicketInput('text', 'e.g Kenya Airways', 'Airline',
                'airline', tripId, airline
              )}
            </div>
            {tripType.match('return') && (
              <div className="travel-submission-details__return" id="return-fields">
                {this.renderTicketInput('datetime-local', '19:35:00', 'Departure Time',
                  'returnDepartureTime', tripId, returnDepartureTime,
                  this.formatDateTime(arrivalTime), this.formatDateTime(arrivalDate)
                )}
                {this.renderTicketInput('datetime-local', '19:35:00', 'Arrival Time',
                  'returnTime', tripId, returnTime, this.formatDateTime(returnDepartureTime)
                )}
                {this.renderTicketInput('text', 'e.g KQ 532', 'Return Flight Number',
                  'returnTicketNumber', tripId, returnTicketNumber
                )}
                {this.renderTicketInput('text', 'e.g Kenya Airways', 'Airline',
                  'returnAirline', tripId, returnAirline
                )}
              </div>
            )}
          </div>
        </form>
      )
    );
  };

  formatDateTime = (date) => moment(date).format('YYYY-MM-DDTHH:mm');

  renderSubmissionsUtils = () => {
    const {utilsType, checklistItem } = this.props;
    const { submissions: [item]} = checklistItem;
    const {showUploadedField} = this.state;
    return (
      <Fragment>
        {utilsType && utilsType.match('ticketFieldset')
        && this.renderTicketFieldset()}
        {utilsType && utilsType.match('uploadField') && !item && !showUploadedField
        && this.renderUploadField()}
        {(utilsType && utilsType.match('uploadField') && (item && typeof item.value !== 'object') && !showUploadedField)
        && this.renderUploadField()}
        {((utilsType && utilsType.match('uploadField') && (item && typeof item.value === 'object')) || showUploadedField)
        && this.renderUploadedField()}
      </Fragment>
    );
  };

  render() {
    const { utilsType } = this.props;
    return ( 
      <Fragment>
        { utilsType && utilsType.match('textarea') ?
          this.renderTextarea()  : this.renderSubmissionsUtils() }
      </Fragment> 
    );
  }
}

SubmissionsUtils.propTypes = {
  checklistItem: PropTypes.object.isRequired, utilsType: PropTypes.string,
  checkId: PropTypes.string.isRequired, returnTicketNumber: PropTypes.string.isRequired,
  submissionText: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.string
  ]).isRequired,
  ticketNumber: PropTypes.string.isRequired,
  airline: PropTypes.string.isRequired, returnAirline: PropTypes.string.isRequired,
  handleUpload: PropTypes.func.isRequired, setTicketFields: PropTypes.func.isRequired,
  setTextArea: PropTypes.func.isRequired, postSuccess: PropTypes.array.isRequired,
  setUploadedFileName: PropTypes.func.isRequired, handleInputChange: PropTypes.func.isRequired,
  handleTextAreaSubmit: PropTypes.func.isRequired, fileUploadData: PropTypes.object.isRequired,
  handleTicketSubmit: PropTypes.func.isRequired, tripType: PropTypes.string.isRequired,
  uploadedFileName: PropTypes.string.isRequired, uploadProcess: PropTypes.string.isRequired,
  itemsToCheck: PropTypes.array.isRequired, uploadedFileDate: PropTypes.string.isRequired,
  closeModal: PropTypes.func, shouldOpen: PropTypes.bool, userReadinessDocument: PropTypes.object,
  modalType: PropTypes.string, handleUserDocumentUpload: PropTypes.func,
  submitAttachedDocument: PropTypes.func.isRequired, hasSelectedDocument:PropTypes.bool.isRequired,
  uploadedFileUrl: PropTypes.string, setUploadedFile: PropTypes.func.isRequired
};
SubmissionsUtils.defaultProps = {utilsType: '', closeModal: () => {}, userReadinessDocument: {},
  shouldOpen: false, modalType: '', handleUserDocumentUpload: () => {}, uploadedFileUrl: ''};

export default SubmissionsUtils;
