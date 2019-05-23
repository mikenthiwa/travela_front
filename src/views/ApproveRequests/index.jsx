import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { fetchUserRequestDetails } from '../../redux/actionCreator/requestActions';
import { updateRequestStatus, updateBudgetStatus } from '../../redux/actionCreator/approvalActions';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import RequestDetails from '../../components/RequestDetails';
import ConnectedCommentBox from '../../components/RequestsModal/CommentBox/CommentBox';
import ConnectedUserComments from '../../components/RequestsModal/UserComments/UserComments';
import NotFound from '../ErrorPages/NotFound';
import './ApproveRequests.scss';
import { fetchSubmission } from '../../redux/actionCreator/checkListSubmissionActions';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';

export const Approve = (type = 'manager') => {
  class ApproveRequests extends Component {
    state = {
      modalInvisible: true,
      buttonSelected: ''
    };

    componentDidMount() {
      const {
        fetchUserRequestDetails,fetchSubmission, request: {tripType},
        match: { params: { requestId } },
      } = this.props;
      fetchUserRequestDetails(requestId);
      fetchSubmission({requestId, tripType});
    }

    componentWillReceiveProps(nextProps){
      const {isConfirmDialogLoading, isUpdatedStatus} = nextProps;

      if(isUpdatedStatus) {
        this.setState({modalInvisible: isUpdatedStatus && !isConfirmDialogLoading});
      }
    }

    handleButtonSelected = (e) => {
      this.setState({ buttonSelected: e.target.textContent, modalInvisible: false });
    };

    handleDecision = (requestId) => {
      const { updateRequestStatus, updateBudgetStatus} = this.props;
      const { buttonSelected } = this.state;
      const newStatus = buttonSelected === 'approve'
        ? 'Approved' : 'Rejected';
      const action = () => type === 'budget' ?
        updateBudgetStatus(requestId, { budgetStatus: newStatus }) : updateRequestStatus({ requestId, newStatus });
      action();
    };

    hideModal = () =>{
      const {modalInvisible} = this.state;
      this.setState({ modalInvisible: !modalInvisible });
    }

    renderDialogText = () => {
      const { buttonSelected } = this.state;
      if (buttonSelected === 'approve') return 'request approval';
      return 'request rejection';
    };

    renderButtons = (request) => {
      const {isConfirmDialogLoading} = this.props;
      const { modalInvisible, buttonSelected } = this.state;
      const { status, budgetStatus } = request;
      const disabled = type === 'budget' ? budgetStatus !== 'Open' : status !== 'Open';
      const approvedStatus = status === 'Approved' || status === 'Verified'
        ? 'approved' : (status === 'Open' ? 'approve' : 'disabled');
      const rejectedStatus = status === 'Rejected'
        ? 'rejected' : (status === 'Open' ? 'reject' : 'disabled');
      const approvedBudgetStatus = budgetStatus === 'Approved'
        ? 'approved' : (budgetStatus === 'Open' ? 'approve' : 'disabled');
      const rejectedBudgetStatus = budgetStatus === 'Rejected'
        ? 'rejected' : (budgetStatus === 'Open' ? 'reject' : 'disabled');
      const appStatus = type === 'budget' ? approvedBudgetStatus : approvedStatus;
      const rejected = type === 'budget' ? rejectedBudgetStatus : rejectedStatus;
      
      return (
        <div className="btn-group">
          <button
            type="button"
            className={`action-button--${type === 'budget' ? approvedBudgetStatus : approvedStatus}`}
            disabled={disabled}
            onClick={this.handleButtonSelected}
          >
            {appStatus === 'disabled' ? 'approve' : appStatus}
          </button>
          <button
            type="button"
            className={`action-button--${type === 'budget' ? rejectedBudgetStatus : rejectedStatus}`}
            disabled={disabled}
            onClick={this.handleButtonSelected}
          >
            {rejected === 'disabled' ? 'reject' : rejected}
          </button>
          <ConfirmDialog
            id={request.id}
            modalInvisible={modalInvisible}
            buttonSelected={buttonSelected}
            closeDeleteModal={this.hideModal}
            renderDialogText={this.renderDialogText}
            handleApprove={this.handleDecision}
            handleReject={this.handleDecision}
            documentText="Request"
            isConfirmDialogLoading={isConfirmDialogLoading}
          />
        </div>
      );
    };

    renderRightPaneQuestion = (name) => {
      const { request: { status, budgetStatus } } = this.props;
      const componentStatus = type === 'budget' ? budgetStatus : status;
      const pluralizedName = name && name[name.length - 1] === 's' ?
        `${name}'` : `${name}'s`;
      const statusText = componentStatus && componentStatus === 'Rejected' ? 'rejected' : 'approved';
      return componentStatus === 'Open'
        ? `Do you want to approve ${pluralizedName} travel request?`
        : `You have ${statusText} ${pluralizedName} travel request`;
    };

    render() {
      const {
        request, isLoading, match: { params: { requestId } },
        currentUser, email, location: { pathname }, errors, history, submissionInfo, shouldOpen, openModal, closeModal
      } = this.props;

      const headerTags =  ['Manager\'s Approval', 'Budget Check', 'Travel verifications'];

      if (typeof (errors) === 'string' && errors.includes('does not exist')) {
        return <NotFound redirectLink="/requests/my-approvals" errorMessage={errors} />;
      }
 
      return (
        <Fragment>
          <RequestDetails
            request={request}
            history={history}
            requestId={requestId}
            renderButtons={this.renderButtons}
            renderRightPaneQuestion={this.renderRightPaneQuestion}
            isLoading={isLoading}
            headerTags={headerTags}
            type={headerTags}
            pathname={pathname}
            submissionInfo={submissionInfo}
            shouldOpen={shouldOpen}
            openModal={openModal}
            closeModal={closeModal}
          />
          {
            !isEmpty(request) ? (
              <div className="request-comment">
                <ConnectedCommentBox
                  requestId={requestId} documentId={null} />
                <ConnectedUserComments
                  comments={request.comments}
                  email={email.result && email.result.email}
                  currentUser={currentUser}
                />
              </div>
            ) : ''
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
    updateBudgetStatus: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    currentUser: PropTypes.object,
    email: PropTypes.object,
    submissionInfo:PropTypes.object.isRequired,
    fetchSubmission: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    shouldOpen: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    isConfirmDialogLoading: PropTypes.bool,
    isUpdatedStatus: PropTypes.bool
  };

  ApproveRequests.defaultProps = {
    request: {},
    isLoading: true,
    currentUser: {},
    email: {},
    errors: {},
    isConfirmDialogLoading:false,
    isUpdatedStatus:false
  };
  return ApproveRequests;
};

const mapStateToProps = (state) => ({
  request: state.requests.requestData,
  errors: state.requests.errors,
  isLoading: state.requests.fetchingRequest,
  currentUser: state.user.currentUser,
  email: state.user.getUserData,
  submissionInfo: state.submissions,
  shouldOpen: state.modal.modal.shouldOpen,
  isConfirmDialogLoading: state.approvals.updatingStatus,
  isUpdatedStatus: state.approvals.updatedStatus,
});

const actionCreators = {
  fetchUserRequestDetails,
  updateRequestStatus,
  updateBudgetStatus,
  fetchSubmission,
  openModal,
  closeModal
};

export default (type = 'manager') => connect(mapStateToProps, actionCreators)(Approve(type));
