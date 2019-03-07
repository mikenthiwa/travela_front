import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { fetchUserRequestDetails } from '../../redux/actionCreator/requestActions';
import { updateRequestStatus } from '../../redux/actionCreator/approvalActions';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import RequestDetails from '../../components/RequestDetails';
import ConnectedCommentBox from '../../components/RequestsModal/CommentBox/CommentBox';
import ConnectedUserComments from '../../components/RequestsModal/UserComments/UserComments';
import './ApproveRequests.scss';

export class ApproveRequests extends Component {
  state = {
    modalInvisible: true,
    buttonSelected: ''
  };

  componentDidMount() {
    const {
      fetchUserRequestDetails,
      match: { params: { requestId } },
    } = this.props;
    fetchUserRequestDetails(requestId);
  }

  handleButtonSelected = (e) => {
    this.setState({ buttonSelected: e.target.textContent, modalInvisible: false });
  }

  handleDecision = (requestId) => {
    const { updateRequestStatus } = this.props;
    const { buttonSelected } = this.state;
    const newStatus = buttonSelected === 'approve'
      ? 'Approved' : 'Rejected';
    updateRequestStatus({ requestId, newStatus });
    this.setState({ modalInvisible: true });
  }

  renderDialogText = () => {
    const { buttonSelected } = this.state;
    if (buttonSelected === 'approve') return 'approval'; 
    return 'rejection';
  }

  renderButtons = (request) => {
    const { modalInvisible, buttonSelected } = this.state;
    const { status } = request; 
    const disabled = status !== 'Open' ? true : false;
    const approvedStatus = status === 'Approved' || status === 'Verified'
      ? 'approved' : (status === 'Open' ? 'approve' : 'disabled');
    const rejectedStatus = status === 'Rejected'
      ? 'rejected' : (status === 'Open' ? 'reject' : 'disabled');
    return (
      <div className="btn-group">
        <button
          type="button"
          className={`action-button--${approvedStatus}`}
          disabled={disabled}
          onClick={this.handleButtonSelected}
        >
          {approvedStatus === 'disabled' ? 'approve' : approvedStatus}
        </button>
        <button
          type="button"
          className={`action-button--${rejectedStatus}`}
          disabled={disabled}
          onClick={this.handleButtonSelected}
        >
          {rejectedStatus === 'disabled' ? 'reject' : rejectedStatus}
        </button>
        <ConfirmDialog
          id={request.id}
          modalInvisible={modalInvisible}
          buttonSelected={buttonSelected}
          closeDeleteModal={()=> {}}
          renderDialogText={this.renderDialogText}
          handleApprove={this.handleDecision}
          handleReject={this.handleDecision}
        />
      </div>
    );
  }

  renderRightPaneQuestion = (name) => {
    const { request: { status } } = this.props;
    const pluralizedName = name && name[name.length - 1] === 's' ?
      `${name}'` : `${name}'s`;    
    const statusText = status && status === 'Rejected' ? 'rejected' : 'approved'; 
    return status === 'Open'
      ? `Do you want to approve ${pluralizedName} travel request?`
      : `You have ${statusText} ${pluralizedName} travel request`;
  }

  render() {
    const {
      request, isLoading,
      match: { params: { requestId } },
      currentUser, email
    } = this.props;
    const headerTags = ['Manager\'s Stage'];
    return (
      <Fragment>
        <RequestDetails
          request={request}
          requestId={requestId}
          renderButtons={this.renderButtons}
          renderRightPaneQuestion={this.renderRightPaneQuestion}
          isLoading={isLoading}
          headerTags={headerTags}
          approvalPage
        />
        {
          !isEmpty(request) ? (
            <div className="request-comment">
              <ConnectedCommentBox
                requestId={requestId}
                documentId={null}
              />
              <ConnectedUserComments
                comments={request.comments}
                email={email.result && email.result.email}
                currentUser={currentUser}
              />
            </div> 
          ): ''
        }
      </Fragment>
    );
  }
}

ApproveRequests.propTypes = {
  fetchUserRequestDetails: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  request: PropTypes.object,
  updateRequestStatus: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  currentUser: PropTypes.object,
  email: PropTypes.object
};

ApproveRequests.defaultProps = {
  request: {},
  isLoading: true,
  currentUser: {},
  email: {},
};

const mapStateToProps = (state) => ({
  request: state.requests.requestData,
  isLoading: state.requests.fetchingRequest,
  currentUser: state.user.currentUser,
  email: state.user.getUserData,
});

const actionCreators = {
  fetchUserRequestDetails,
  updateRequestStatus
};

export default connect(mapStateToProps, actionCreators)(ApproveRequests);
