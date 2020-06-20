import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import ConnectedCommentBox from '../CommentBox/CommentBox';
import ConnectedUserComments from '../UserComments/UserComments';
import RequestTabHeader from './RequestDetailsTab';
import RequestUtils from '../../../helper/request/RequestUtils';
import './RequestDetails.scss';
import tabIcons from '../../../images/icons/new-request-icons/requestProgress';
import commentIcon from '../../../images/icons/new-request-icons/Chat.svg';
import addCommentIcon from '../../../images/icons/new-request-icons/AddComment.svg';
import TravelCheckList from '../../TravelCheckList';
import ConnectedUserChecklist from '../../../views/UserChecklist';


export class RequestDetails extends Component {
  state = {
    steps: [
      { id: 1, name: 'Manager Approval', status: '', statusDate: 'You are currently here', icon: tabIcons.ManagerApproval },
      { id: 2, name: 'Budget Check', status: '', statusDate: '', icon: tabIcons.Budget },
      { id: 3, name: 'Travel Checklist', status: '', statusDate: '', icon: tabIcons.TravelChecklist },
      { id: 4, name: 'Travel Verification', status: '', statusDate: '', icon: tabIcons.Verify }
    ],
    currentTab: 1, showCommentBox: false,
  }

  componentDidMount() {
    const { submissionInfo: {percentageCompleted, submissions } } = this.props;
    this.setSteps(percentageCompleted, submissions);
  }
  
  
  componentWillReceiveProps(nextProp){
    const {
      submissionInfo: {percentageCompleted: prevPercent},
    } = this.props;
    const {
      submissionInfo: {percentageCompleted: nextPercent},
      submissionInfo,
    } = nextProp;
    
    if(prevPercent !== nextPercent){
      this.setSteps(nextPercent, submissionInfo.submissions);
    }
  }
  
  componentDidUpdate (prevProps) {
    const {
      smartSubmissions: { isSubmitted: prevIsSubmitted },
    } = this.props;
    const {
      submissionInfo, smartSubmissions: { isSubmitted: nextIsSubmitted }
    } = prevProps;

    if(prevIsSubmitted !== nextIsSubmitted){
      this.setSteps(null, submissionInfo.submissions);
    }
  }

  setSteps(percent, submission) {
    const { requestData, smartSubmissions } = this.props;
    const { steps, currentTab } = this.state;
    const newSteps = steps;
    if (requestData.status === 'Verified') {
      this.loadStatus(3, submission);
      this.setState({
        steps: newSteps,
        currentTab: 5
      });
    }
    else if (percent === 100) {
      this.loadStatus(3, submission);
      this.setState({
        steps: newSteps,
        currentTab: 4
      });
    }
    else if(smartSubmissions.isSubmitted) {
      this.loadStatus(3);
      this.setState({
        steps: newSteps,
        currentTab: 4
      });
    }
    else if (requestData.budgetStatus === 'Approved') {
      this.loadStatus(2);
      this.setState({
        steps: newSteps,
        currentTab: 3});
    } else if (requestData.status === 'Approved') {
      newSteps[currentTab - 1].status = `Approved by ${requestData.approver}`;
      newSteps[currentTab - 1].statusDate = `Completed on ${moment(requestData.timeApproved).format('DD/MM/YY')}`;
      newSteps[currentTab].statusDate = 'You are currently here';
      this.setState({
        steps: newSteps,
        currentTab: 2}
      );
    }
  }

  checklistCompletionDate = (submissions) => {
    const { smartSubmissions } = this.props;
    let latestDate;
    if(submissions) {
      const datesArray = [];
      submissions.map(submission =>
        submission.checklist.map(checklist =>
          checklist.submissions.map(updated =>
            datesArray.push(updated.updatedAt))));
      latestDate = _.sortBy(datesArray, recent => recent).reverse()[0];
    }
    latestDate = smartSubmissions.updatedAt;
    return moment(latestDate).format('DD/MM/YY');
  }

  loadStatus(tab, submission) {
    const { requestData } = this.props;
    const { steps } = this.state;
    const completionTime = tab === 3 ? `Completed on ${this.checklistCompletionDate(submission)}` : '';
    const newSteps = { ...steps };
    newSteps[0].status = `Approved by ${requestData.approver}`;
    newSteps[0].statusDate = `Completed on ${moment(requestData.timeApproved).format('DD/MM/YY')}`;
    newSteps[1].status = `Approved by ${requestData.budgetApprovedBy}`;
    newSteps[1].statusDate = `Completed on ${moment(requestData.budgetApprovedAt).format('DD/MM/YY')}`;
    newSteps[2].statusDate = completionTime;
    newSteps[tab].statusDate = requestData.status === 'Verified' ?
      `Completed on ${moment(requestData.updatedAt).format('DD/MM/YY')}` :
      'You are currently here';
    this.setState({ steps: newSteps });
  }

  handleDisplayCommentBox() {
    const { showCommentBox } = this.state;
    if (showCommentBox) {
      this.setState({
        showCommentBox: false});
    } else {
      this.setState({
        showCommentBox: true});
    }
  }


  renderTripDates(requestDetails) {
    const { requestData } = this.props;
    if (requestDetails.returnDate === null) {
      return this.renderMultiTripDates(requestDetails, requestData.trips[requestData.trips.length-2]);
    } else {
      return this.renderTravelDates(requestDetails);
    }
  }

  renderMultiTripDates(requestData, previousTrip) {
    if (requestData.returnDate === null) {
      return `${moment(requestData.departureDate).format('DD MMM YYYY').toUpperCase()}`;
    }
   
    if (moment(previousTrip.returnDate).year() === moment(requestData.departureDate).year()) {
      return (`${moment(previousTrip.returnDate).format('DD MMM').toUpperCase()} -
      ${moment(requestData.departureDate).format('DD MMM YYYY').toUpperCase()}`);
    } else {
      return (`${moment(previousTrip.returnDate).format('DD MMM YYYY').toUpperCase()} -
      ${moment(requestData.departureDate).format('DD MMM YYYY').toUpperCase()}`);
    }
  }

  renderTravelDates(requestData) {
    if (moment(requestData.departureDate).year() === moment(requestData.returnDate).year()) {
      return `${moment(requestData.departureDate).format('DD MMM').toUpperCase()} -
      ${moment(requestData.returnDate).format('DD MMM YYYY').toUpperCase()}`;
    }
    return (`${moment(requestData.departureDate).format('DD MMM YYYY').toUpperCase()} -
    ${moment(requestData.returnDate).format('DD MMM YYYY').toUpperCase()}`);
  }

  renderPartitions(item, title, mobile){
    return(
      <div className={`partition ${mobile}`}>
        <p className="text--grey">{title}</p>
        <p className="text--black">
          {item}
        </p>
      </div>
    );
  }

  renderRequestDetails(requestData) {
    return (
      <div>
        {requestData.trips && requestData.trips.map(request => {
          const flightRoute = `${request.origin.split(',')[1]} - ${request.destination.split(',')[1]}`;
          const travelDates = this.renderTripDates(request);
          const { accommodationType, beds} = request;
          const flightTitle = 'Flight Route';
          const travelTitle = 'Travel Dates';
          const accommodationTitle = 'Accomodation';
          const mobile = 'mobile';
          const reasonTitle = 'Travel Reason';
          const accommodation = accommodationType !== 'Residence' ?
            accommodationType : `${beds.bedName}, ${beds.rooms.roomName}, ${beds.rooms.guestHouses.houseName}`;
          return (
            <Fragment key={request.id}>
              <div className="main-container request-details-container">
                <div className="left-pane">
                  <div className="row">
                    {this.renderPartitions(flightRoute, flightTitle)}
                    {this.renderPartitions(travelDates, travelTitle)}
                    {this.renderPartitions(accommodation, accommodationTitle)}
                    {this.renderPartitions(RequestUtils.getTravelReason(request), reasonTitle, mobile)}
                  </div>
                </div>
                <div className="right-pane">
                  <div className="row desktop">
                    <p className="text--grey">Travel Reason</p>
                    <p className="text--black">
                      {RequestUtils.getTravelReason(request)}
                    </p>
                  </div>
                </div>
              </div>
            </Fragment>);})}
      </div>);
  }

  renderDisplayCommentBox(text, icon) {
    return (
      <div
        onClick={() => { this.handleDisplayCommentBox(); }}
        role="presentation"
        className="requestDetails__add-comment">
        <img src={icon} alt="comment icon" />
        <span>
          {text}
        </span>
      </div>);
  }

  renderHideCommentText() {
    const { requestId } = this.props;
    const { showCommentBox } = this.state;
    return (
      <Fragment>
        {showCommentBox ?
          (
            <div className="requestDetails-comment__toggle">
              {this.renderDisplayCommentBox('Hide Comment', addCommentIcon)}
              <div className="request-details__comments">
                <ConnectedCommentBox requestId={requestId} documentId={null} />
                {this.renderComments()}
              </div>
            </div>
          ):
          this.renderDisplayCommentBox('Show Comment', commentIcon)}
      </Fragment>);
  }

  renderAddCommentText() {
    const { requestId } = this.props;
    const { showCommentBox } = this.state;
    return (
      <Fragment>
        <div className="requestDetails-comment__toggle">
          {this.renderDisplayCommentBox('Add Comment', commentIcon)}
          {showCommentBox && (
            <div className="request-details__comments mdl-grid">
              <ConnectedCommentBox requestId={requestId} documentId={null} />
              {this.renderComments()}
            </div>)}
        </div>
      </Fragment>
    );
  }

  renderComments() {
    const{ requestData, currentUser } = this.props;
    return(
      <ConnectedUserComments
        comments={requestData.comments ? requestData.comments.slice(0).reverse() : []}
        email={currentUser.email}
        currentUser={currentUser}
      />
    );
  }

  renderCheckListSubmission(hideButton) {
    const { requestData, travelChecklists, closeModal, openModal, showTravelChecklist, modalType,
      fileUploads, fetchSubmission, postSubmission, submissionInfo, uploadFile, shouldOpen,
      userReadinessDocument, history, downloadAttachments, showDynamicChecklist } = this.props;
    return (
      <Fragment>
        {
          requestData.id && (
            <Fragment>
              {showDynamicChecklist ? (<ConnectedUserChecklist requestId={requestData.id} />)
                : (
                  <TravelCheckList
                    request={requestData} requestId={requestData.id}
                    travelChecklists={travelChecklists}
                    submissionInfo={submissionInfo}
                    uploadFile={uploadFile}
                    postSubmission={postSubmission}
                    fetchSubmission={fetchSubmission}
                    closeModal={closeModal}
                    openModal={openModal} modalType={modalType}
                    shouldOpen={shouldOpen} hideSubmit={hideButton}
                    showTravelChecklist={showTravelChecklist}
                    fileUploads={fileUploads} history={history}
                    userReadinessDocument={userReadinessDocument}
                    downloadAttachments={downloadAttachments} 
                  />
                )
              }
            </Fragment>
          )}
      </Fragment>

    );
  }

  renderComment = (requestData) => {
    const { comments } = requestData;
    return (
      <Fragment>
        {requestData.comments && comments.length < 1 ? (
          <div className="requestDetails__comment">
            {this.renderAddCommentText()}
          </div>)
          : (
            <div className="requestDetails__comment">
              {this.renderHideCommentText()}
            </div>)}
      </Fragment>

    );
  }



  render() {
    const { requestData, travelChecklists, user } = this.props;
    const { steps, currentTab } = this.state;

    return (
      <Fragment>
        <div className="width-91">
          <RequestTabHeader steps={steps} currentTab={currentTab} />
          {currentTab === 1 && this.renderRequestDetails(requestData)}
          {currentTab === 2 && this.renderRequestDetails(requestData)}
          {currentTab === 3 && (
            <div>
              {this.renderRequestDetails(requestData)}
              { this.renderCheckListSubmission()}
            </div>
          )}
          {currentTab === 4 && (
            <div>
              {this.renderRequestDetails(requestData)}
              { this.renderCheckListSubmission()}
            </div>
          )}
          {currentTab === 5 && this.renderRequestDetails(requestData)}
          {this.renderComment(requestData)}
        </div>
      </Fragment>
    );
  }
}

RequestDetails.propTypes = {
  requestData: PropTypes.object,
  user: PropTypes.object,
  currentUser: PropTypes.object,
  requestId: PropTypes.string,
  userReadinessDocument: PropTypes.object,
  history: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  postSubmission: PropTypes.func.isRequired,
  showTravelChecklist: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  submissionInfo: PropTypes.object.isRequired,
  fetchSubmission: PropTypes.func.isRequired,
  travelChecklists: PropTypes.object.isRequired,
  fileUploads: PropTypes.object.isRequired,
  uploadFile: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool,
  downloadAttachments: PropTypes.func.isRequired,
  smartSubmissions: PropTypes.object.isRequired,
  showDynamicChecklist: PropTypes.bool.isRequired,
};

RequestDetails.defaultProps = {
  requestData: {},
  user: {},
  currentUser: {},
  requestId: null,
  userReadinessDocument: {},
  modalType: '',
  shouldOpen: false
};

export default RequestDetails;
