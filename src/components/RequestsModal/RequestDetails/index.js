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
    this.setSteps();
  }

  componentWillReceiveProps(nextProp){
    const { submissionInfo: {percentageCompleted: prevPercent} } = this.props;
    const { submissionInfo: {percentageCompleted: nextPercent}, submissionInfo } = nextProp;
 
    if( prevPercent !== nextPercent ){
      this.setSteps(nextPercent, submissionInfo.submissions);
    } 
  }

  setSteps(percent, submission) {
    
    const { requestData } = this.props;
    const { steps, currentTab } = this.state;
    const newSteps = steps;
    if (requestData.status === 'Verified') {
      this.loadStatus(3);
      this.setState({
        steps: newSteps,
        currentTab: 5
      });
    } 
    else if (percent === 100) {
      const completionTime = this.checklistCompletionDate(submission);
      this.loadStatus(3);
      newSteps[2].status = '';
      newSteps[2].statusDate = `Completed on ${completionTime}`;
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
        currentTab: 2});
    }
  }

  checklistCompletionDate = (submissions) => {
    const datesArray = [];
    submissions.map(submission => 
      submission.checklist.map(checklist => 
        checklist.submissions.map(updated => 
          datesArray.push(updated.updatedAt))));
    const latestDate = _.sortBy(datesArray, recent => recent).reverse()[0];
    return moment(latestDate).format('DD/MM/YY');
    
  }

  loadStatus(tab) {
    const { requestData } = this.props;
    const { steps } = this.state;
    const newSteps = steps;
    newSteps[0].status = `Approved by ${requestData.approver}`;
    newSteps[0].statusDate = `Completed on ${moment(requestData.timeApproved).format('DD/MM/YY')}`;
    newSteps[1].status = `Approved by ${requestData.budgetApprovedBy}`;
    newSteps[1].statusDate = `Completed on ${moment(requestData.budgetApprovedAt).format('DD/MM/YY')}`;
    newSteps[tab].statusDate = 'You are currently here';
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

  renderTripHeader() {
    return (
      <tr>
        <th>Flight Route</th>
        <th>Travel Dates</th>
        <th>Accommodation</th>
      </tr>);
  }

  renderReasonHeader() {
    return (
      <tr>
        <th>Travel Reason</th>
      </tr>);
  }

  renderReasonBody(requestData) {
    return(
      <tr>
        <td>
          {RequestUtils.getTravelReason(requestData)}
        </td>
      </tr>);
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

  renderTripDetails(requestData) {
    const flightRoute = `${requestData.origin.split(',')[0]} - ${requestData.destination.split(',')[0]}`;
    const travelDates = this.renderTripDates(requestData);
    const accommodation = requestData.accommodationType;
    return (
      <tr>
        <td>{flightRoute}</td>
        <td>{travelDates}</td>
        <td>{accommodation}</td>
      </tr>);
  }

  renderRequestDetails(requestData) {
    return (
      <div>
        {requestData.trips.map(request => {
          return (
            <Fragment key={request.id}>
              <div className="request-details-container">
                <table className="trip-details-pod">
                  <thead>
                    {this.renderTripHeader()}
                  </thead>
                  <tbody>
                    {this.renderTripDetails(request)}
                  </tbody>
                </table>
                <table className="reason-details-pod">
                  <thead>
                    {this.renderReasonHeader()}
                  </thead>
                  <tbody>
                    {this.renderReasonBody(request)}
                  </tbody>
                </table>
              </div>
            </Fragment>);
        })}
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
            <div className="request-details__comments">
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
      userReadinessDocument, history } = this.props;
    return (
      <Fragment>
        {
          requestData.id && (
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
              userReadinessDocument={userReadinessDocument} />
          )}
      </Fragment>
      
    );
  }

  renderComment = (requestData) => {
    const { comments } = requestData; 
    return (
      <Fragment>
        {comments.length < 1 ? (
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
              { this.renderCheckListSubmission('hideButton')}
            </div>
          )}
          {currentTab === 5 && this.renderRequestDetails(requestData)}
          {currentTab !== 3 && this.renderComment(requestData)}   
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
  shouldOpen: PropTypes.bool

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
