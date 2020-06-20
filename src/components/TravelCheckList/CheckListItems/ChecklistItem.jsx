import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import RadioButtonField from './RadioButtonField';
import FileUploadField from './FileUploadField';
import './Checklist.scss';

class ChecklistItem extends React.Component {
  state = { hideUploadButton: false, info: '', showDate: false };

  componentDidMount = () => {
    const { checklistItem, postSuccess } = this.props;
    const {
      submissions: [item]
    } = checklistItem;
    item && this.setUploadInfo(item);
    (item && item.userUpload.url) ? this.setState({showDate: true}) :
      this.setState({showDate: false});
    !item && this.setState({ info: 'Pending' });
  };

  componentWillReceiveProps = nextProps => {
    const { postSuccess, checklistItem } = nextProps;
    const {
      submissions: [item]
    } = checklistItem;
    postSuccess && item && this.setUploadInfo(item);
    (item && item.userUpload.url) ? this.setState({showDate: true}) :
      this.setState({showDate: false});
    !item && this.setState({ info: 'Pending' });
  };

  handleDuoField = value => {
    this.setState({ hideUploadButton: value });
  };

  setUploadInfo = item => {
    const { itemType } = this.props;
    let info =
      item.userResponse !== null || item.userUpload.url ? 'Done' : 'Pending';
    const duoCase =
      itemType === 'duoItem' &&
      (item.userResponse === 'yes' && !item.userUpload.url);
    info = duoCase ? 'Pending' : info;
    this.setState({ info: info });
  };

  renderRadioButtons = () => {
    const {
      checklistItem,
      postSubmission,
      checkId,
      requestId,
      tripId
    } = this.props;
    return (
      <Fragment>
        <RadioButtonField
          checklistItem={checklistItem}
          postSubmission={postSubmission}
          checkId={checkId}
          requestId={requestId}
          tripId={tripId}
          handleDuoField={this.handleDuoField}
        />
      </Fragment>
    );
  };

  renderUploadButton = () => {
    const { hideUploadButton } = this.state;
    const {
      openModal, closeModal, shouldOpen, uploadFile, checklistItem, tripId,
      checkId, requestId, itemType, userReadinessDocument, postSubmission,
      fileUploads, downloadAttachments, modalType
    } = this.props;
    return (
      <Fragment>
        <FileUploadField
          openModal={openModal} closeModal={closeModal} shouldOpen={shouldOpen}
          uploadFile={uploadFile} checklistItem={checklistItem} tripId={tripId}
          checkId={checkId} requestId={requestId} itemType={itemType}
          userReadinessDocument={userReadinessDocument} postSubmission={postSubmission}
          downloadAttachments={downloadAttachments} hideUploadButton={hideUploadButton}
          fileUploads={fileUploads} modalType={modalType} ocrScan={false}
        />
      </Fragment>
    );
  };

  renderDuoField = () => {
    return (
      <Fragment>
        {this.renderRadioButtons()}
        {this.renderUploadButton()}
      </Fragment>
    );
  };

  renderIsUploading = () => {
    const {
      fileUploads: { isUploading },
      checkId
    } = this.props;
    return (
      <Fragment>
        {isUploading.match(checkId) && (
          <div className="submission-progresbar">
            <div className="submission-progress__spinner" />
            <div id="submission-progress" className="submission-progress__">
              Submitting...
            </div>
          </div>
        )}
      </Fragment>
    );
  };

  renderUploadStatus = () => {
    const {
      fileUploads: { isUploading },
      checkId
    } = this.props;
    const { info } = this.state;
    return (
      <Fragment>
        {!isUploading.match(checkId) && (
          <div className="submission-progress__wrapper">
            <div className="submission-progress__">
              <div className="submission-progress__success">{info}</div>
            </div>
          </div>
        )}
      </Fragment>
    );
  };

  render() {
    const { checklistItem: { name, id, resources, submissions: [item] },
      number, itemType } = this.props;
    const UpdatedAt = item && item.updatedAt;
    const uploadTime = moment(UpdatedAt).format('DD/MM/YYYY');
    const { showDate } = this.state;
    const renderElements = {
      uploadItem: this.renderUploadButton(),
      duoItem: this.renderDuoField(),
      responseItem: this.renderRadioButtons()
    };
    return (
      <div className="checklist-item">
        <p className="title">
          <span className="number">{number}</span>
          {' '}
          {name}
          {resources && resources.length > 0 && resources.map(resource => (
            <a
              key={id} href={resource.link} target="blank"
              className="travelSubmission--item__resource-link">
              [
              {resource.label}
              ]
            </a>
          ))}
        </p>
        {showDate && <p className="upload-time">{`Uploaded ${uploadTime}`}</p>}
        <div className="body">
          {/(uploadItem)|(duoItem)|(responseItem)/.test(itemType) &&
            renderElements[itemType]}
          {this.renderIsUploading()}
          {this.renderUploadStatus()}
        </div>
      </div>
    );
  }
}

ChecklistItem.propTypes = {
  postSubmission: PropTypes.func.isRequired,
  requestId: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  checklistItem: PropTypes.object.isRequired,
  tripId: PropTypes.string.isRequired,
  checkId: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  fileUploads: PropTypes.object.isRequired,
  downloadAttachments: PropTypes.func.isRequired,
  itemType: PropTypes.string.isRequired,
  uploadFile: PropTypes.func.isRequired,
  userReadinessDocument: PropTypes.object.isRequired,
  modalType: PropTypes.string,
  postSuccess: PropTypes.array.isRequired
};

ChecklistItem.defaultProps = {
  modalType: ''
};

export default ChecklistItem;
