import React, { Component, Fragment } from 'react';
import Popover from 'react-awesome-popover';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {deleteRequest, fetchUserRequestDetails} from '../../../redux/actionCreator/requestActions';
import Preloader from '../../../components/Preloader/Preloader';
import RequestDetailsPage from '../../../components/RequestsModal/RequestDetails';
import backButton from '../../../images/back-icon.svg';
import './NewRequestPage.scss';
import { fetchTravelChecklist } from '../../../redux/actionCreator/travelChecklistActions';
import { fetchRoleUsers } from '../../../redux/actionCreator/roleActions';
import { fetchSubmission, postSubmission } from '../../../redux/actionCreator/checkListSubmissionActions';
import { uploadFile } from '../../../redux/actionCreator/fileUploadActions';
import { openModal, closeModal } from '../../../redux/actionCreator/modalActions';
import {
  fetchUserReadinessDocuments } from '../../../redux/actionCreator/travelReadinessDocumentsActions';
import NotFound from '../../ErrorPages/NotFound';
import RequestUtils from '../../../helper/request/RequestUtils';
import TripModificationReasonModal from '../../../components/TripModifications/TripModificationReasonModal';
import ButtonLoadingIcon from '../../../components/Forms/ButtonLoadingIcon';
import {
  fetchModificationRequest,
  submitModificationRequest
} from '../../../redux/actionCreator/tripModificationActions';
import { downloadAttachments } from '../../../redux/actionCreator/attachmentActions';

export class NewRequestPage extends Component {
  state = {
    modificationReason : {
      title: '',
      type: '',
      message: ''
    }
  };

  componentDidMount() {
    const { fetchUserRequestDetails, match: { params: { requestId } },
      fetchTravelChecklist, fetchModificationRequest,
      fetchUserReadinessDocuments, user, fetchRoleUsers } = this.props;
    fetchUserRequestDetails(requestId);
    fetchTravelChecklist(requestId);
    fetchRoleUsers(53019);
    fetchModificationRequest(requestId);
    fetchUserReadinessDocuments(user.currentUser.userId);
  }

  handleShowTravelChecklist = (request) => {
    const {fetchSubmission } = this.props;
    const { id: requestId, tripType } = request;
    fetchSubmission({ requestId, tripType });
  };

  renderRequestDetailsPage = () => {
    const { match:{ params: { requestId } },
      requestData, fetchingRequest, currentUser, user, shouldOpen, modalType,
      userReadinessDocument, fetchSubmission, postSubmission, travelChecklists,
      submissionInfo, fileUploads, uploadFile, openModal, closeModal, history, managers,
      downloadAttachments
    } = this.props;

    const managerName = RequestUtils.getManagerNameOrId(managers, requestData.approver);
    requestData.approver = managerName;
    requestData.manager = managerName;

    return (
      <RequestDetailsPage
        fetchingRequest={fetchingRequest} requestData={requestData}
        requestId={requestId} currentUser={currentUser}
        user={user} travelChecklists={travelChecklists}
        showTravelChecklist={this.handleShowTravelChecklist}
        closeModal={closeModal} openModal={openModal}
        modalType={modalType} shouldOpen={shouldOpen} history={history}
        fileUploads={fileUploads} fetchSubmission={fetchSubmission}
        postSubmission={postSubmission} submissionInfo={submissionInfo}
        uploadFile={uploadFile} userReadinessDocument={userReadinessDocument}
        downloadAttachments={downloadAttachments}
      />
    );
  };

  renderModificationReasonDialog = () => {
    const {
      shouldOpen, modalType, closeModal,
      requestData: {
        id: requestId
      },
      submitModificationRequest,
      tripModifications: {
        viewRequest : {
          submittingRequest
        }
      },
      history
    } = this.props;
    const { modificationReason, modificationReason: { type } } = this.state;
    return (
      <TripModificationReasonModal
        closeModal={closeModal}
        shouldOpen={shouldOpen}
        onSubmit={(reason) => submitModificationRequest(
          requestId,
          type,
          reason,
          history
        )}
        submittingReason={submittingRequest}
        modalType={modalType}
        {...modificationReason}
      />
    );
  };

  showModificationReasonDialog = (type, title, message) => {
    const { openModal, requestData: { status } } = this.props;
    this.setState({ modificationReason : { title, message, type }});
    const modalType = (type === 'Delete' && status === 'Open')
      ? 'delete document'
      : `${type} request modification`;
    openModal(true, modalType);
  };

  renderModificationButton = ({type,modalTitle, modalMessage, classNames = ''}) => {
    const { modificationReason: { type: modificationType }} = this.state;
    const { tripModifications : { viewRequest: { submittingRequest }} } = this.props;
    return (
      <button
        type="button"
        onClick={() => this.showModificationReasonDialog(type, modalTitle, modalMessage)}
        className={`action-btn ${classNames}`}>
        <ButtonLoadingIcon buttonText={type} isLoading={type === modificationType && submittingRequest} />
      </button>
    );
  };


  renderModificationMessage = ({type}) => {
    const message = {
      'Cancel Trip': {
        title: 'Pending Cancellation',
        info: 'This request has been submitted for modification to the Travel Team. ' +
          'A notification will be sent upon approval.'
      },
      'Modify Dates': {
        title: 'Pending Modification',
        info: 'This request has been submitted for modification to the Travel Team. ' +
          'A notification will be sent upon approval.'
      }
    };
    const {title, info} = message[type];
    return (
      <Popover action="hover" placement="bottom">
        <div className="pending__notification">
          <span className="pending__message">
            {title}
          </span>
        </div>
        <div className="pending__notification__info">
          {info}
        </div>
      </Popover>
    );
  };

  displayModificationButtons = (pending, status) => (
    <div className="action-btn__wrapper">
      {
        !pending ? (
          <div className="buttons">
            {
              this.renderModificationButton(
                {
                  type: 'Modify Dates',
                  modalTitle: `Modify this ${status} trip`,
                  modalMessage: 'Please provide a comprehensive reason for modifying this trip',
                  classNames: 'btn-modify-request'
                }
              )
            }
            {
              this.renderModificationButton(
                {
                  type: 'Cancel Trip',
                  modalTitle: `Cancel this ${status} trip`,
                  modalMessage: 'Please provide a comprehensive reason for cancelling this trip',
                  classNames: 'btn-delete-request'
                }
              )
            }
          </div>
        ) : (
          this.renderModificationMessage(pending)
        )
      }
    </div>
  );

  renderModificationButtons = () => {
    const { requestData: { status } } = this.props;
    const {
      tripModifications: {
        viewRequest: {
          fetchingModifications,
          pendingModification: pending
        }
      }
    } = this.props;
    return (
      <div className="page-header__request__action-btns">
        { !fetchingModifications && this.displayModificationButtons(pending, status)}
      </div>
    );
  };

  render() {
    const { match:
      { params: { requestId } },
    requestData : {
      status
    },
    fetchingRequest, history, errors,
    } = this.props;
    if(typeof(errors) === 'string' && errors.includes('does not exist')) {
      return <NotFound redirectLink="/requests" errorMessage={errors} />;
    }
    return (
      <Fragment>
        <div className="requests__page-header">
          <h1 className="page-header__request">
            <span
              className="goback"
              role="presentation" onClick={() => {
                history.goBack();
              }}>
              <img src={backButton} className="header__link" alt="back icon" />
            </span>
            <span>
              {`REQUEST #${requestId}`}
            </span>
          </h1>
          {status !== 'Open' && this.renderModificationButtons()}
        </div>
        {this.renderModificationReasonDialog()}
        {fetchingRequest ? <Preloader /> : this.renderRequestDetailsPage() }
      </Fragment>
    );
  }
}

NewRequestPage.propTypes = {
  fetchUserRequestDetails: PropTypes.func,
  match: PropTypes.object.isRequired,
  requestData: PropTypes.object,
  fetchingRequest: PropTypes.bool,
  currentUser: PropTypes.object,
  user: PropTypes.object,
  travelChecklists: PropTypes.object,
  submissionInfo: PropTypes.object.isRequired,
  fileUploads: PropTypes.object.isRequired,
  modalType: PropTypes.string,
  shouldOpen: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  postSubmission: PropTypes.func.isRequired,
  userReadinessDocument: PropTypes.object,
  deleteRequest: PropTypes.func,
  uploadFile: PropTypes.func.isRequired,
  fetchTravelChecklist: PropTypes.func.isRequired,
  fetchUserReadinessDocuments: PropTypes.func.isRequired,
  fetchSubmission: PropTypes.func.isRequired,
  fetchModificationRequest: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  fetchRoleUsers: PropTypes.func.isRequired,
  managers: PropTypes.array.isRequired,
  submitModificationRequest: PropTypes.func.isRequired,
  downloadAttachments: PropTypes.func.isRequired
};

NewRequestPage.defaultProps = {
  fetchUserRequestDetails: () => { },
  requestData: {},
  fetchingRequest: false,
  currentUser: {},
  user: {},
  deleteRequest: () => {},
  travelChecklists: {},
  modalType: '', userReadinessDocument: {},
  errors: {},
};

const mapStateToProps = ({ requests, travelChecklist, role,
  submissions, modal, fileUploads, travelReadinessDocuments, user, tripModifications}) => {
  return {
    ...requests,
    ...modal.modal,
    userReadinessDocument: travelReadinessDocuments.userReadiness.travelDocuments,
    requestData: requests.requestData,
    fetchingRequest: requests.fetchingRequest,
    travelChecklists: travelChecklist,
    submissionInfo: submissions,
    fileUploads, user,
    managers: role.roleUsers,
    tripModifications
  };
};

const actionCreators = {
  fetchUserRequestDetails,
  fetchTravelChecklist,
  fetchSubmission,
  postSubmission,
  deleteRequest,
  fetchModificationRequest,
  submitModificationRequest,
  uploadFile,
  openModal,
  closeModal,
  fetchUserReadinessDocuments,
  fetchRoleUsers,
  downloadAttachments
};

export default connect(mapStateToProps, actionCreators)(NewRequestPage);
