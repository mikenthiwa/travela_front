import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserRequestDetails } from '../../redux/actionCreator/requestActions';
import { fetchAttachments, downloadAttachments } from '../../redux/actionCreator/attachmentActions';
import { updateRequestStatus } from '../../redux/actionCreator/approvalActions';
import { fetchSubmission } from '../../redux/actionCreator/checkListSubmissionActions';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import RequestDetails from '../../components/RequestDetails';
import CommentsSection from './CommentsSection';
import { ChecklistItems, TicketDetails } from './TravelChecklistItems';
import chatIcon from '../../images/icons/Chat.svg';
import Preloader from '../../components/Preloader/Preloader';
import './VerificationDetails.scss';
import '../../components/TravelCheckList/CheckListItems/FileUploadField/FileUploadField.scss';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import {fetchTravelCostsByLocation} from '../../redux/actionCreator/travelCostsActions';
import { TRAVEL_MANAGERS } from '../../helper/roles';
import TabView from '../../components/TripTabView/TabView';
import CircularProgressBar from '../../components/TravelCheckList/CircularLoader';


export const VerificationDetails = (type = 'verifications') => {
  class Verifications extends Component {
    state = {
      modalInvisible: true,
      buttonSelected: '',
      displayComments: true,
      isTravelCostLoaded: true
    };

    componentDidMount() {
      const {
        fetchUserRequestDetails, fetchAttachments, fetchSubmission, request: {tripType},
        match: {params: {requestId}}
      } = this.props;
      fetchUserRequestDetails(requestId);
      fetchAttachments(requestId);
      fetchSubmission({requestId, tripType});
    }


    componentWillReceiveProps(nextProps) {
      const {isConfirmDialogLoading, isUpdatedStatus} = nextProps;

      if (isUpdatedStatus) {
        this.setState({modalInvisible: isUpdatedStatus && !isConfirmDialogLoading});
      }
    }

    componentDidUpdate(prevProps, prevState){
      const {request: {trips, tripType}, fetchTravelCostsByLocation} = this.props;
      if (trips) {
        let locations = tripType === 'One Way' ? [] : this.getStipendOriginAndDestination(trips);
        if (!prevState.isTravelCostLoaded && locations){
          fetchTravelCostsByLocation(locations);
          const onUpdate = () => {
            this.setState({
              isTravelCostLoaded: true
            });
          };
          onUpdate();
        } 
      }
    }



    getStipendOriginAndDestination = (trips) => {
      const locations = trips.map(trip => {
        const { origin, destination } = trip;
        return { origin, destination };
      });
      return locations;
    }

    handleButtonSelected = (e) => {
      const newState= {buttonSelected: e.target.textContent, modalInvisible: false};
      this.setState( newState);
    };

    handleDecision = (requestId) => {
      const {updateRequestStatus} = this.props;
      const newStatus = 'Verified';
      updateRequestStatus({requestId, newStatus});
    };

    handleDownloadAttachments = (url, fileName) => {
      const {downloadAttachments} = this.props;
      downloadAttachments(url, fileName);
    };

    toggleComments = () => {
      const {displayComments} = this.state;
      if (displayComments) return this.setState({displayComments: false});
      return this.setState({displayComments: true});
    };

    renderRightPaneQuestion = (name) => {
      const {request: {status}} = this.props;
      const pluralizedName = name && name[name.length - 1] === 's' ?
        `${name}'` : `${name}'s`;

      return status === 'Approved'
        ? `Do you want to Verify ${pluralizedName} travel request?`
        : `You have ${status && status.toLowerCase()} ${pluralizedName} travel request`;
    };

    renderTravelCheckList = () => {

      const {submissionInfo: { submissions, percentageCompleted},  
        request} = this.props;
      const name = request.name && request.name.split(' ')[0];
      const gender = request.gender && request.gender;
      const genderPronoun = request.gender && 
            gender.toLowerCase() === 'female'? 'her' : 'his';
      const statusMessage = percentageCompleted === 100 ? 
        `has completed ${genderPronoun} Travel Checklist`:
        `is yet to complete ${genderPronoun} Travel Checklist`;
      let tabsData = submissions.map((list, index) => {
        const title = `Trip ${index + 1}`;
        const subTitle = `${list.tripOrigin} to ${list.destinationName}`;
        return { title, subTitle };
      });
      const flightTab = { title: 'FLIGHT DETAILS', subTitle: 'Ticket details' };
      tabsData = [...tabsData, flightTab];
      const newSubmissions = [...submissions, {}];
      return (
        <div className="rectangle checklist">
          <div className="attachments">
            <div className="travelCheck-list">
              <div className="travelCheck-list--card__head">
                <div className="details">
                  <p>{`${name}'s Travel Checklist`}</p>
                  {`${request.name} ${statusMessage} `}
                </div>
                <div className="circular-calculator">
                  <CircularProgressBar
                    percentage={percentageCompleted}
                    strokeWidth={5}
                    sqSize={50}
                  />
                </div>
              </div>
              <div>         
                <div className="travelCheck-list--card__body">
                  <TabView tabs={tabsData} currentTab={0}>
                    {
                      newSubmissions.map((submission, index) => (
                        (index !== newSubmissions.length-1) ? (
                          <ChecklistItems
                            key={submission.tripId}
                            handleDownloadAttachments={this.handleDownloadAttachments} 
                            checklistItems={submission.checklist} 
                            destination={submission.destinationName} />
                        ) : (
                          <TicketDetails
                            key="ticket-tab"
                            submissions={submissions} 
                            handleDownloadAttachments={this.handleDownloadAttachments}
                          />
                        )
                      ))
                    }
                  </TabView>
                </div>
              </div>
            </div> 
          </div>
          <div className="desktop-comment">
            {this.renderComments()}
          </div>
        </div>
      );
    };

    renderComments = () => {
      const {
        request, email, currentUser,
        match: {params: {requestId}}
      } = this.props;
      const {displayComments} = this.state;
      return (
        <CommentsSection
          renderCommentsToggle={this.renderCommentsToggle}
          request={request} requestId={requestId}
          currentUser={currentUser} email={email}
          displayComments={displayComments}
        />
      );
    };

    renderBottomPane() {
      return (
        <div className="">
          <div className="bottom-container">
            {this.renderTravelCheckList()}
            <div className="mobile-comment left">
              {this.renderComments()}
            </div>
          </div>
        </div>
      );
    }

    renderCommentsToggle = () => {
      const {displayComments} = this.state;
      return (
        <div>
          <button onClick={this.toggleComments} type="button" className="comment-toggle-button">
            <img className="chat image" src={chatIcon} alt="chat-icon" />
            <p className="comment-button-text">{displayComments ? 'Hide Comments' : 'Show Comments'}</p>
          </button>
        </div>
      );
    };

    renderDialogText = () => {
      const {buttonSelected} = this.state;

      if (buttonSelected === 'verify') return 'request verification';
      return 'rejection';
    };

    renderButtons = (request) => {
      const {modalInvisible, buttonSelected} = this.state;
      const {status, trips} = request;
      const {currentUser: {roles}, isConfirmDialogLoading, 
        submissionInfo: { percentageCompleted } } = this.props;

      const allowedRoles = TRAVEL_MANAGERS;
      const [{centers}] = roles.filter(role => allowedRoles.includes(role.roleName));
      const locations = (centers.length && centers.map(center => center.location)) || [];
      const origin = trips.length && trips[0].origin.split(', ').pop();

      const disabled = percentageCompleted !== 100 || status !== 'Approved' || !locations.includes(origin);
      const verifiedStatus = !locations.includes(origin) ? 'disabled' : (status === 'Verified'
        ? 'verified' : ((status === 'Approved' &&  percentageCompleted === 100) ? 'verify' : 'disabled'));

      return (
        <div className="btn-group">
          <button
            type="button" className={`action-button--${verifiedStatus}`}
            disabled={disabled} onClick={this.handleButtonSelected}
          >
            {verifiedStatus === 'disabled' ? 'verify' : verifiedStatus}
          </button>
          <ConfirmDialog
            id={request.id} modalInvisible={modalInvisible}
            buttonSelected={buttonSelected}
            closeDeleteModal={() => this.setState({modalInvisible: true})}
            renderDialogText={this.renderDialogText}
            handleVerify={this.handleDecision}
            handleReject={this.handleDecision}
            documentText="Request"
            isConfirmDialogLoading={isConfirmDialogLoading}
          />
        </div>
      );
    };

    render() {
      const {
        request, isLoading, submissionInfo,
        match: {params: {requestId}}, location: {pathname},
        history, shouldOpen, openModal, closeModal, travelCosts
      } = this.props;
      const headerTags = ['Manager\'s Approval', 'Budget Check', 'Travel Verification'];
      return (
        <Fragment>
          {isLoading
            ? <Preloader />
            : (
              <div className="verification-page-container">
                <RequestDetails
                  request={request} requestId={requestId}
                  renderButtons={this.renderButtons}
                  history={history}
                  renderRightPaneQuestion={this.renderRightPaneQuestion} isLoading={isLoading}
                  type={headerTags}
                  headerTags={headerTags} pathname={pathname}
                  submissionInfo={submissionInfo}
                  shouldOpen={shouldOpen}
                  openModal={openModal}
                  closeModal={closeModal}
                  travelCosts={travelCosts}
                />
                {this.renderBottomPane()}
              </div>
            )
          }
        </Fragment>
      );
    }
  }

  Verifications.defaultProps = {
    request: {},
    isLoading: true,
    currentUser: {},
    email: {},
    isConfirmDialogLoading: false,
    isUpdatedStatus: false,
    travelCosts: {
      isLoading: false,
      stipends: [],
      flightCosts: [],
      hotelEstimates: []
    }
  };

  Verifications.propTypes = {
    request: PropTypes.object,
    isLoading: PropTypes.bool, currentUser: PropTypes.object,
    email: PropTypes.object, fetchUserRequestDetails: PropTypes.func.isRequired,
    fetchAttachments: PropTypes.func.isRequired, downloadAttachments: PropTypes.func.isRequired,
    updateRequestStatus: PropTypes.func.isRequired, match: PropTypes.object.isRequired, 
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    submissionInfo: PropTypes.object.isRequired,
    fetchSubmission: PropTypes.func.isRequired,
    shouldOpen: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    isConfirmDialogLoading: PropTypes.bool,
    isUpdatedStatus: PropTypes.bool,
    travelCosts: PropTypes.object,
    fetchTravelCostsByLocation: PropTypes.func.isRequired
  };
  return Verifications;
};

const mapStateToProps = (state) => {
  return {
    request: state.requests.requestData,
    errors: state.requests.errors,
    checklist: state.attachments,
    isLoading: state.requests.fetchingRequest,
    currentUser: state.user.currentUser,
    email: state.user.getUserData,
    attachments: state.attachments.submissions,
    submissionInfo: state.submissions,
    shouldOpen: state.modal.modal.shouldOpen,
    isConfirmDialogLoading: state.approvals.updatingStatus,
    isUpdatedStatus: state.approvals.updatedStatus,
    travelCosts: state.travelCosts
  };
};

const actionCreators = {
  fetchUserRequestDetails,
  fetchAttachments,
  updateRequestStatus,
  downloadAttachments,
  fetchSubmission,
  openModal,
  closeModal,
  fetchTravelCostsByLocation
};

export default (type = 'verifications') => connect(mapStateToProps, actionCreators)(VerificationDetails(type));
