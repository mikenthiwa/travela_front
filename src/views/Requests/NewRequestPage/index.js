import React, { Component, Fragment } from 'react';
import Popover from 'react-awesome-popover';
import _ from 'lodash';
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
import TripModificationReasonConfirmationModal from '../../../components/TripModifications/TripModificationReasonConfirmationModal/TripModificationReasonConfirmationModal';
import ButtonLoadingIcon from '../../../components/Forms/ButtonLoadingIcon';
import {
  fetchModificationRequest,
  submitModificationRequest
} from '../../../redux/actionCreator/tripModificationActions';
import { downloadAttachments } from '../../../redux/actionCreator/attachmentActions';
import TravelCosts, {calculateTotalTripCost} from '../../../components/Forms/NewRequestForm/TravelCosts/TravelCosts';
import Modal from '../../../components/modal/Modal';
import {fetchTravelCostsByLocation} from '../../../redux/actionCreator/travelCostsActions';
import walletImage from '../../../images/budget-Icon.svg';

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

  componentDidUpdate(prevProps, prevState){
    const {requestData, fetchTravelCostsByLocation} = this.props;
    const {trips, tripType} = requestData;
    if (trips) {
      let locations = tripType === 'One Way' ? [] : this.getStipendOriginAndDestination(trips);
      if (!_.isEqual(prevProps.requestData, requestData)){
        fetchTravelCostsByLocation(locations);
      } 
    }
  }


  showModal = () => {
    const { openModal } = this.props;
    openModal(true, 'Cost Breakdown');
  }

  getStipendOriginAndDestination = (trips) => {
    const locations = trips.map(trip => {
      const { origin, destination } = trip;
      return { origin, destination };
    });
    return locations;
  }

  renderStipendModal = () => {
    const {
      travelCosts: { stipends, flightCosts, hotelEstimates, isLoading }, 
      requestData: {trips}, 
      modalType, 
      shouldOpen, 
      closeModal, } = this.props;
    return (
      <Modal
        customModalStyles="travel-stipend-modal"
        closeDeleteModal={closeModal}
        width="100%"
        height="100%"
        visibility={shouldOpen && (modalType === 'Cost Breakdown') ? 'visible':'invisible'}
        title="Travel Stipend Breakdown"
      >
        <div className="modal-info-center-body">
          <TravelCosts
            isLoading={isLoading}
            trips={trips}
            stipends={stipends}
            flightCosts={flightCosts}
            hotelEstimates={hotelEstimates} />
        </div>
      </Modal>
    );
  };

  getTotalTripCost = () => {
    const { travelCosts: {flightCosts, hotelEstimates, stipends }, requestData: { trips }} = this.props;
    return calculateTotalTripCost(trips, stipends, flightCosts, hotelEstimates)
      .reduce((acc, { stipendAmount = 0, hotelCost = 0 , flightCost = 0}) =>
        (acc + stipendAmount + hotelCost + flightCost),
      0);
  }

  handleShowTravelChecklist = (request) => {
    const {fetchSubmission } = this.props;
    const { id: requestId, tripType } = request;
    fetchSubmission({ requestId, tripType });
  };

  renderRequestDetailsPage = () => {
    const { match:{ params: { requestId }, path },
      requestData, fetchingRequest, currentUser, user, shouldOpen, modalType,
      userReadinessDocument, fetchSubmission, postSubmission, travelChecklists,
      submissionInfo, fileUploads, uploadFile, openModal, closeModal, history, managers,
      downloadAttachments, smartSubmissions
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
        downloadAttachments={downloadAttachments} smartSubmissions={smartSubmissions}
        showDynamicChecklist={path === '/new-requests/:requestId'}
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

  renderModificationReasonConfirmationDialog = () => {
    const {
      shouldOpen, modalType, closeModal, openModal,
      requestData: {
        id: requestId
      },
    } = this.props;
    const { modificationReason, } = this.state;
    return (
      <TripModificationReasonConfirmationModal
        closeModal={closeModal}
        shouldOpen={shouldOpen}
        openModal={openModal}
        onSubmit={(type, modalTitle, modalMessage) => {
          this.showModificationReasonDialog(type, modalTitle, modalMessage);
        }}
        modalType={modalType}
        requestId={requestId}
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

  showModificationReasonConfirmationDialog = (type, title, message,) => {
    const { openModal} = this.props;
    this.setState({ modificationReason : { title, message, type }});
    openModal(true, `${type} request modification confirmation`);
  };

  triggerModificationType = (type, modalTitle, modalMessage) => {
    type === 'Modify Dates' ? this.showModificationReasonConfirmationDialog(type, modalTitle, modalMessage,) :
      this.showModificationReasonDialog(type, modalTitle, modalMessage);
  };

  renderModificationButton = ({type, modalTitle, modalMessage, classNames = ''}) => {
    const { modificationReason: { type: modificationType }} = this.state;
    const { tripModifications : { viewRequest: { submittingRequest }} } = this.props;
    return (
      <button
        type="button"
        onClick={() => this.triggerModificationType(type, modalTitle, modalMessage,)}
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
      status,
      trips
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
            <span 
              onClick={this.showModal} 
              role="presentation"
              className="total-cost-button"
            >
              <img src={walletImage} alt="wallet-icon" className="wallet-icon" />
              {trips && `${this.getTotalTripCost()} $`}
            </span>
          </h1>
          {status !== 'Open' && this.renderModificationButtons()}
        </div>
        {this.renderModificationReasonConfirmationDialog()}
        {this.renderModificationReasonDialog()}
        {this.renderStipendModal()}
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

const mapStateToProps = ({ requests, travelChecklist, role, dynamicChecklistSubmission,
  submissions, modal, fileUploads, travelReadinessDocuments, user, tripModifications, travelCosts}) => {
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
    tripModifications,
    travelCosts,
    smartSubmissions: dynamicChecklistSubmission,
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
  downloadAttachments,
  fetchTravelCostsByLocation,
};

export default connect(mapStateToProps, actionCreators)(NewRequestPage);
