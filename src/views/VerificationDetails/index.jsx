import React, { Component, Fragment}  from  'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { isEmpty, isEqual } from 'lodash';
import { fetchUserRequestDetails } from '../../redux/actionCreator/requestActions';
import { fetchAttachments, downloadAttachments } from '../../redux/actionCreator/attachmentActions';
import { updateRequestStatus } from '../../redux/actionCreator/approvalActions';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import RequestDetails from '../../components/RequestDetails';
import CommentsSection from './CommentsSection';

import { AttachmentItems, ChecklistItems, TicketDetails } from './TravelChecklistItems';
import getValues from './getValues';
import saveIcon from '../../images/icons/save-icon.svg';
import chatIcon from '../../images/icons/Chat.svg';
import './VerificationDetails.scss';



class VerificationDetails extends Component {

  state = {   
    commentText: '',
    modalInvisible: true,
    buttonSelected: '',
    displayComments: true
  };

  componentDidMount() {
    const {       
      fetchUserRequestDetails,
      fetchAttachments,
      match: { params: { requestId } } } = this.props;
    fetchUserRequestDetails(requestId);
    fetchAttachments(requestId);
  }

  getValues() {
    const { attachments } = this.props;
    return getValues(attachments);
  }

  handleButtonSelected = (e) => {
    this.setState({ buttonSelected: e.target.textContent, modalInvisible: false });
  }

  handleDecision = (requestId) => {
    const { updateRequestStatus } = this.props;
    const newStatus = 'Verified';
    updateRequestStatus({ requestId, newStatus });
    this.setState({ modalInvisible: true });
  }

  handleDownloadAttachments = (url, fileName) => {
    const { downloadAttachments } = this.props;
    downloadAttachments(url, fileName);
  }

  
  toggleComments() {
    const { displayComments } = this.state;  
    if (displayComments) {
      return this.setState({ displayComments: false});
    } 
    return this.setState({displayComments: true});
  }

  renderRightPaneQuestion = (name) => {
    const { request: { status } } = this.props;
    const pluralizedName = name && name[name.length - 1] === 's' ?
      `${name}'` : `${name}'s`;
    return status === 'Approved'
      ? `Do you want to Verify ${pluralizedName} travel request?`
      : `You have ${status && status.toLowerCase()} ${pluralizedName} travel request`;
  }
 
  renderFlightDetails() {
    const { ticketDetails } = this.getValues();
    return ( 
      <div className="rectangle right">
        <div className="flightDetails">
          <p className="flight-heading">Flight Details</p>       
          { ticketDetails.length 
            ? <TicketDetails ticketDetails={ticketDetails} />            
            : (
              <div className="no-flightDetails">
                <p>No Flight Details</p> 
              </div>
            )}  
        </div>       
      </div>           
    );
  }
  renderTravelCheckList() {
    const { checklistItems, attachmentDetails } = this.getValues();
    return (
      <div className="rectangle left">
        <div className="attachments">
          <p className="heading">Travel Checklist For This Trip</p>
          <div className="attachment-items">
            { attachmentDetails.length
              ? <AttachmentItems attachmentDetails={attachmentDetails} handleDownloadAttachments={this.handleDownloadAttachments} />            
              : (
                <div className="no-attachments">
                  <p>No Uploaded Attachments.</p>
                </div>
              )}         
          </div> 
          {
            checklistItems.length
              ? <ChecklistItems checklistItems={checklistItems} />           
              : null
          }
        </div>   
      </div>
    );   
  }
  
  renderBottomPane() {
    return (
      <div className="">
        <div className="bottom-container">
          {this.renderTravelCheckList()}
          {this.renderFlightDetails()}         
        </div>
        
      </div>
    );
  } 

  renderCommentsToggle() {
    const { commentText } = this.state;
    return (
      <div>
        <button onClick={() => this.toggleComments()} type="button" className="comment-toggle-button">            
          <img className="chat image" src={chatIcon} alt="chat-icon" />
          <p className="comment-button-text">{commentText || 'Hide Comments'}</p>            
        </button>
      </div>
    );
  }

  renderDialogText = () => {
    const { buttonSelected } = this.state;
    if (buttonSelected === 'verify') return 'approval'; 
    return 'rejection';
  }


  renderButtons  = (request) => {
    const { modalInvisible, buttonSelected } = this.state;    
    const { status } = request; 
    const disabled = status !== 'Approved' ? true : false;
    const verifiedStatus = status === 'Verified'
      ? 'verified' : (status === 'Approved' ? 'verify' : 'disabled');
    return (
      <div className="btn-group">
        <button
          type="button"
          className={`action-button--${verifiedStatus}`}
          disabled={disabled}
          onClick={this.handleButtonSelected}
        >
          {verifiedStatus === 'disabled' ? 'verify' : verifiedStatus}
        </button>        
        <ConfirmDialog
          id={request.id} modalInvisible={modalInvisible}
          buttonSelected={buttonSelected} closeDeleteModal={()=> {}}
          renderDialogText={this.renderDialogText} handleApprove={this.handleDecision}
          handleReject={this.handleDecision}
        />
      </div>
    );
  }
  
  render() {
    const { 
      request, email, currentUser,
      isLoading,
      match: { params: { requestId } }, location: { pathname },
    } = this.props;
    const headerTags = ['Manager\'s Approval', 'Budget Check', 'Travel Verification'];
    const { displayComments } = this.state;
    return (
      <Fragment>
        <div className="verification-page-container">          
          <RequestDetails
            request={request} requestId={requestId} renderButtons={this.renderButtons} 
            renderRightPaneQuestion={this.renderRightPaneQuestion} isLoading={isLoading}
            headerTags={headerTags} pathname={pathname}
          />
          {this.renderBottomPane()}
          {this.renderCommentsToggle()}
          <CommentsSection 
            request={request} requestId={requestId} 
            currentUser={currentUser} email={email} 
            displayComments={displayComments}
          />

        </div>
      </Fragment>
    );
  }
}

VerificationDetails.defaultProps = {
  request: {},
  isLoading: true,
  currentUser: {},
  email: {},
};

VerificationDetails.propTypes = {
  request: PropTypes.object,
  isLoading: PropTypes.bool,
  currentUser: PropTypes.object,
  email: PropTypes.object,
  fetchUserRequestDetails: PropTypes.func.isRequired,
  fetchAttachments: PropTypes.func.isRequired,
  downloadAttachments: PropTypes.func.isRequired,
  updateRequestStatus: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  attachments: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    request: state.requests.requestData,
    checklist: state.attachments,
    isLoading: state.requests.fetchingRequest,
    currentUser: state.user.currentUser,
    email:state.user.getUserData,
    attachments: state.attachments.submissions,
  };
};

const actionCreators = {
  fetchUserRequestDetails,
  fetchAttachments,
  updateRequestStatus,  
  downloadAttachments
};
export default connect(mapStateToProps, actionCreators)(VerificationDetails);
