/* eslint react/jsx-one-expression-per-line: 0 */
/* eslint react/jsx-key: 0 */
import React, {Component, Fragment} from 'react';
import {PropTypes} from 'prop-types';
import SubmissionsUtils from './SubmissionsUtils';

class SubmissionItem extends Component {
  state = {
    info: '', type: '', fileName: '', submissionText: '',
    departureTime: '', arrivalTime: '', ticketNumber: '', airline: '',
    returnDepartureTime: '', returnTime: '', returnTicketNumber: '',
    returnAirline: '', validTicket: true, uploadedFileName: '', validInput: true,
    uploadedFileDate: '', uploadedFileUrl: '', hasSelectedDocument: false,
  };

  componentWillReceiveProps(nextProps) {
    const {
      fileUploadData: {isUploading, uploadSuccess, cloudinaryUrl}, checkId,
      checklistItem : { name , submissions: [ item ] }
    } = nextProps;

    if (isUploading.match(checkId) && ( item || name !== 'Travel Ticket Details')) {
      return this.setState({info: 'Uploading file...', type: 'uploading'});
    }
    if(!(name === 'Travel Ticket Details' && !item)){
      uploadSuccess.match(checkId) && this.setState({
        info: 'Done', type: 'success', uploadedFileName: '',
        uploadedFileUrl: cloudinaryUrl
      });
    }
  }

  getEmptyFieldsMessage = () => {
    const {
      departureTime, arrivalTime, returnDepartureTime, returnTime,
      airline, returnTicketNumber,
      returnAirline, ticketNumber
    } = this.state;
    const { fileUploadData: { firstFlightDate, returnFlightDate, flightAirline } } = this.props;
    const datesEmpty = [departureTime || firstFlightDate, arrivalTime || firstFlightDate,
      returnDepartureTime || returnFlightDate, returnTime || returnFlightDate]
      .some(date => date === '');
    const otherFieldsEmpty = [airline || flightAirline, returnTicketNumber, ticketNumber, returnAirline]
      .some(field => field === '');
    return otherFieldsEmpty ? 'All Fields are required' :
      (datesEmpty ? 'The trip time details are required' : '');
  };

  checkFileSize = (file) => {
    if (file.files[0]) {
      const {size, name} = file.files[0];
      if (size > 1500000) {
        file.value = '';
        this.setState({info: 'File must not exceed 1.5mb', type: 'error'});
        return false;
      }
      this.setState({info: '', type: '', fileName: name});
      return true;
    }
    return false; // if no file
  }

  setTextArea = (value, id) => {
    const {checkId} = this.props;
    const fill = checkId.match(id);
    fill && this.setState({submissionText: value});
  }

  setTicketFields = (ticketDetails, id) => {
    const {checkId} = this.props;
    const fill = checkId.match(id);
    fill && this.setState({...ticketDetails});
  }

  setUploadedFileName = (uploadedFileName, date, id, url) => {
    const {checkId} = this.props;
    if(checkId.match(id)) this.setState({uploadedFileName,
      uploadedFileDate: date, uploadedFileUrl : url });
  }

  handleUpload = (e) => {
    e.preventDefault();
    const file = e.target;
    const {
      tripId, handleFileUpload, checklistItem: {id}, checkId, requestId
    } = this.props;
    const validFileSize = this.checkFileSize(file);
    if (validFileSize) return handleFileUpload(file, id, tripId, checkId, requestId);
  }

  handleInputChange = (name, value) => {
    this.setState({[name]: value});

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.handleTicketSubmit();
      this.handleTextAreaSubmit();
    }, 1000);
  };

  submitTextArea = () => {
    const {submissionText} = this.state;

    const {
      tripId, checklistItem: {id}, postSubmission, checkId, requestId
    } = this.props;
    const formData = {tripId, file: submissionText};
    submissionText && postSubmission(
      {formData, checklistItemId: id}, checkId, requestId);
  };

  submitAttachedDocument = (url, fileName, documentId) => {

    const file = { url, fileName, documentId };
    const {
      tripId, checklistItem: {id}, postSubmission, checkId, requestId, history
    } = this.props;
    const formData = { tripId, file };
    file && postSubmission(
      {formData, checklistItemId: id}, checkId, requestId);
  };


  handleTextAreaSubmit = () => {
    const valid = this.validateInputFields();
    valid && this.submitTextArea();
  };

  validateInputFields = () => {
    const {submissionText} = this.state;
    this.setState({validInput: !!submissionText});
    return !!submissionText;
  };

  validateTicketFields = () => {
    const {
      tripType, fileUploadData: { firstFlightDate, returnFlightDate, flightAirline }
    } = this.props;
    const {
      departureTime, arrivalTime, airline, ticketNumber,
      returnDepartureTime, returnTime, returnTicketNumber, returnAirline
    } = this.state;
    const defaultVals = [
      departureTime || firstFlightDate, arrivalTime || firstFlightDate,
      airline || flightAirline, ticketNumber
    ];
    const returnVals = [
      returnDepartureTime || returnFlightDate, returnTime || returnFlightDate,
      returnTicketNumber, returnAirline || flightAirline
    ];
    const valuesArr = tripType.match('return')
      ? [...defaultVals, ...returnVals] : defaultVals;

    const valid = !valuesArr.includes('');
    this.setState({validTicket: valid});
    return valid;
  };

  submitTicket = (valid) => {
    const {
      tripId, checklistItem: {id}, postSubmission, checkId, requestId
    } = this.props;
    const {
      departureTime, arrivalTime, airline, ticketNumber,
      returnDepartureTime, returnTime, returnTicketNumber, returnAirline,
    } = this.state;
    const ticket = {
      departureTime, arrivalTime, airline, ticketNumber,
      returnDepartureTime, returnTime, returnTicketNumber, returnAirline,
    };
    const formData = {tripId, file: ticket};
    valid && postSubmission(
      {formData, checklistItemId: id}, checkId, requestId
    );
  };

  handleTicketSubmit = () => {
    const valid = this.validateTicketFields();
    valid && this.submitTicket(valid);
  };

  renderError = (utilsType) => {
    const {validTicket, validInput} = this.state;
    const msg = utilsType.match('ticketFieldset') &&
      !validTicket && this.getEmptyFieldsMessage();
    const msg2 = !['ticketFieldset', 'uploadField'].includes(utilsType) &&
      !validInput && 'Field is required';
    return (
      <Fragment>
        {(msg || msg2) && (
          <div className="submission-progress__">
            <div className="submission-progress__error">*{msg || msg2}</div>
          </div>
        )}
      </Fragment>
    );
  };

  renderUploadError = () => {
    const {info} = this.state;
    return (
      <div className="submission-progress__">
        <div className="submission-progress__error">
          {info}
        </div>
      </div>
    );
  }

  renderIsUploading = () => {
    const {
      fileUploadData: {isUploading}, checkId, isUploadingStage2, checklistItem: {name}
    } = this.props;
    return (
      <Fragment>
        {
          isUploading.match(checkId) &&
          isUploadingStage2.includes(checkId) && (
            <div className={`submission-progress__ ${name === 'Travel Ticket' && 'travelTicket'}`}>
              <div className="submission-progress__spinner" />
              <div id="submission-progress" className="submission-progress__">
                Uploading file...
              </div>
            </div>
          )
        }
      </Fragment>
    );
  };

  renderUploadDone = () => {
    const {postSuccess, checkId, checklistItem} = this.props;
    const {requiresFiles, submissions: [item]} = checklistItem;

    const submitted = item || (postSuccess.includes(checkId) && !requiresFiles);
    return (
      <div className={`submission-progress__wrapper  ${submitted ? '': 'hidden_progress'}`}>
        <div className="submission-progress__">
          <div className="submission-progress__success">Done</div>
        </div>
      </div>
    );
  };

  setUploadedFile = (fileName, url, updatedAt) => {
    const { fileName: prevFileName } = this.state;
    if (!prevFileName && (prevFileName !== fileName)) this.setState({ fileName,
      type: 'success',
      uploadedFileUrl: url,
      uploadedFileDate: updatedAt
    });
  };

  renderField = () => {
    const {
      type, submissionText, validTicket, fileName,
      departureTime, arrivalTime, returnTime, ticketNumber, uploadedFileName,
      returnDepartureTime, returnTicketNumber, airline, returnAirline,
      uploadedFileDate, hasSelectedDocument, uploadedFileUrl
    } = this.state;
    const {
      checklistItem, fileUploadData, itemsToCheck, tripType, checkId, tripId,
      postSuccess, request, handleUserDocumentUpload, closeModal, shouldOpen,
      modalType, userReadinessDocument
    } = this.props;
    const {requiresFiles, name, submissions: [item]} = checklistItem;
    let utilsType = requiresFiles ? 'uploadField' : 'textarea';
    utilsType = name.toLowerCase().match('travel ticket details')
      ? 'ticketFieldset'
      : utilsType;
    const trip = request.trips.find(trip => trip.id === tripId);
    let hasValidSubmission = true;
    if (submissionText && typeof submissionText === 'object'){
      hasValidSubmission = false;
    }
    return (
      <Fragment>
        <SubmissionsUtils
          checklistItem={checklistItem} utilsType={utilsType} checkId={checkId}
          handleUpload={this.handleUpload} fileUploadData={fileUploadData}
          request={request} trip={trip || {}}
          setUploadedFile={this.setUploadedFile}
          setTextArea={this.setTextArea} postSuccess={postSuccess}
          setTicketFields={this.setTicketFields} arrivalTime={arrivalTime}
          uploadedFileName={uploadedFileName || fileName} uploadProcess={type}
          itemsToCheck={itemsToCheck} handleInputChange={this.handleInputChange}
          handleTextAreaSubmit={this.handleTextAreaSubmit} tripType={tripType}
          handleTicketSubmit={this.handleTicketSubmit} submissionText={hasValidSubmission ? submissionText : ''}
          departureTime={departureTime} setUploadedFileName={this.setUploadedFileName}
          returnDepartureTime={returnDepartureTime} returnTime={returnTime}
          ticketNumber={ticketNumber} returnTicketNumber={returnTicketNumber}
          airline={airline} returnAirline={returnAirline} validTicket={validTicket}
          uploadedFileDate={uploadedFileDate} closeModal={closeModal}
          handleUserDocumentUpload={handleUserDocumentUpload} shouldOpen={shouldOpen}
          userReadinessDocument={userReadinessDocument} modalType={modalType}
          hasSelectedDocument={hasSelectedDocument}
          uploadedFileUrl={uploadedFileUrl}
          submitAttachedDocument={this.submitAttachedDocument}
        />
        {type === 'error' && this.renderUploadError()}
        {type === 'uploading' && name !== 'Travel Ticket Details' && this.renderIsUploading()}
        {this.renderError(utilsType)}
        {this.renderUploadDone()}
      </Fragment>
    );
  };


  renderTravelChecklistItem = () => {
    const {checklistItem: {name, id, resources}, travelTicket, tripId} = this.props;
    return (
      <div className={`travelSubmission--item ${name === 'Travel Ticket Details' && 'travelTicket'}`}>
        <span className="travelSubmission--item__name">{name}</span>
        {resources && resources.length > 0 && resources.map(resource => (
          <a
            key={id} href={resource.link} target="blank"
            className="travelSubmission--item__resource-link">
            [{resource.label}]
          </a>
        ))}
        { name === 'Travel Ticket Details' && (
          <div className="travelSubmission--item__name-two">
            {travelTicket && travelTicket.submissions.length === 0  && (
              <SubmissionItem
                {...this.props}
                key={`${travelTicket.id}`}
                checkId={`${tripId}-${travelTicket.id}`}
                checklistItem={travelTicket}
              />
            )
            }
          </div>
        )}
        {this.renderField()}
      </div>
    );
  }

  render() {
    return (<Fragment>{this.renderTravelChecklistItem()}</Fragment>);
  }
}

SubmissionItem.propTypes = {
  checklistItem: PropTypes.object.isRequired, handleFileUpload: PropTypes.func.isRequired,
  postSubmission: PropTypes.func.isRequired, fileUploadData: PropTypes.object.isRequired,
  tripId: PropTypes.string.isRequired, itemsToCheck: PropTypes.array.isRequired,
  request: PropTypes.object.isRequired, modalType: PropTypes.string,
  postSuccess: PropTypes.array.isRequired, isUploadingStage2: PropTypes.array.isRequired,
  requestId: PropTypes.string.isRequired, tripType: PropTypes.string.isRequired,
  checkId: PropTypes.string.isRequired, handleUserDocumentUpload: PropTypes.func.isRequired,
  closeModal: PropTypes.func, shouldOpen: PropTypes.bool, userReadinessDocument: PropTypes.object,
  history: PropTypes.object.isRequired
};
SubmissionItem.defaultProps = {
  closeModal: () => {}, userReadinessDocument: {}, shouldOpen: false, modalType: '',
};

export default SubmissionItem;
