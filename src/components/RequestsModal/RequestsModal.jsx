import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConnectedCommentBox from './CommentBox/CommentBox';
import { fetchUserRequestDetails } from '../../redux/actionCreator/requestActions';
import { updateRequestStatus } from '../../redux/actionCreator/approvalActions';
import './RequestsModal.scss';
import AddComment from './CommentBox/AddComment';
import FileAttachment from '../../views/Attachments';
import RequestApproval from './CommentBox/RequestApproval';
import ConnectedUserComments from './UserComments/UserComments';
import UserInfo from './UserInfo/UserInfo';
import RequestDetailsHeader from './RequestDetailsHeader';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import Preloader from '../Preloader/Preloader';
import RequestModalHelper, { buttonTextValuePair } from './RequestModalHelper';
import NotFound from '../../views/ErrorPages';

export class RequestDetailsModal extends Component {
  state = {
    approveColor: '',
    rejectColor: '',
    approveTextColor: '',
    rejectTextColor: '',
    buttonSelected: false,
    approvalText: 'Approve',
    rejectText: 'Reject',
    modalInvisible: true
  };

  componentDidMount() {
    const { fetchUserRequestDetails, requestId } = this.props;
    this.loadState();
    fetchUserRequestDetails(requestId);
  }

  handleButtonState = (approvalText, rejectText, buttonSelected, approveColor, rejectColor,
    approveTextColor, rejectTextColor, newStatus, requestId) => {
    this.setState({
      approvalText,
      rejectText,
      approveColor,
      rejectColor,
      approveTextColor,
      rejectTextColor,
      buttonSelected,
      newStatus,
      requestId }, () => this.updateRequestStatus());
  }

  changeButtonColor = (button, status) => {
    const { updateError } = this.props;
    const error = (updateError.length > 0);
    let style = { color: 'black', backgroundColor: 'white' };

    if (!error) {
      style = RequestModalHelper.setApprovedStatusStyle(button, style, status, this.state);
      style = RequestModalHelper.setVerifiedStatusStyle(button, style, status, this.state);
      style = RequestModalHelper.setRejectedStatusStyle(button, style, status, this.state);
    }
    return style;
  }

  handleApprove = (requestId) => () => {
    const { buttonSelected } = this.state;
    const status = (buttonTextValuePair[buttonSelected] === 'Verify') ? 'Verified' : 'Approved';
    this.handleButtonState(status, 'Reject', true, '#49AAAF', '', 'white', '', status, requestId);
  };

  handleReject = (requestId) => () => {
    this.handleButtonState('Approve', 'Rejected', true, '',
      '#FF5359', '', 'white', 'Rejected', requestId);
  };

  handleConfirmModal = (button) => () => {
    this.setState(prevState => ({
      modalInvisible: !prevState.modalInvisible, buttonSelected: button }));
  }

  showButtons = (approveColor, rejectColor, approveTextColor, rejectTextColor, id) => {
    const { approvalText, rejectText, navigatedPage } =  this.state;
    const buttons = [{
      id: 1,
      onClick: this.handleApprove(id),
      action: approveColor,
      actionText: approveTextColor,
      class: 'modal__button-submitted-text bg',
      text: approvalText
    }];
    if (navigatedPage !== 'Verifications') buttons.push({
      id: 2,
      onClick: this.handleReject(id),
      action: rejectColor,
      actionText: rejectTextColor,
      class: 'modal__button-rejected-text',
      text: rejectText
    });
    return buttons;
  }

  updateRequestStatus = () => {
    const { requestId, newStatus }= this.state;
    const { updateRequestStatus } = this.props;
    updateRequestStatus({requestId, newStatus});
    this.setState({ modalInvisible: true });
  }

  loadState() {
    const { navigatedPage } = this.props;
    const { approvalText } = this.state;
    const updatedApprovalText = (navigatedPage === 'Verifications') ? 'Verify' : approvalText;
    this.setState({ navigatedPage, approvalText: updatedApprovalText });
  }

  disableButtons(status, page) {
    const { buttonSelected } = this.state;
    const { isStatusUpdating, updateError } = this.props;
    const error = (updateError.length > 0);
    if (error) return false;
    return page === 'Requests' ||
      page === 'Approvals' && (status && ['Approved', 'Rejected', 'Verified'].includes(status)) ||
      isStatusUpdating || buttonSelected;
  }
  shouldButtonsRender(status) {
    const { navigatedPage } = this.props;
    let shouldRender = this.renderButtons();
    shouldRender = (navigatedPage === 'Requests' &&
     (['Open', 'Approved', 'Rejected', 'Verified'].includes(status)))
      ? RequestModalHelper.renderStatusAsBadge(status) : shouldRender;
    shouldRender = (navigatedPage === 'Approvals' &&
     (['Approved', 'Rejected', 'Verified'].includes(status)))
      ? RequestModalHelper.renderStatusAsBadge(status) : shouldRender;
    shouldRender = (navigatedPage === 'Verifications' &&
     (['Open', 'Rejected', 'Verified'].includes(status)))
      ? RequestModalHelper.renderStatusAsBadge(status) : shouldRender;
    return shouldRender;
  }

  renderDialogText(buttonSelected) {
    let dialogText = 'rejection';
    if (['Approved', 'Approve'].includes(buttonSelected)) {
      dialogText = 'approval';
    } else if (['Verify', 'Verified'].includes(buttonSelected)) {
      dialogText = 'verification';
    }
    return dialogText;
  }

  renderRequestDetailsHeader = () => {
    const {requestData} = this.props;
    return <RequestDetailsHeader requestData={requestData} />;
  }

  renderButtons = () => {
    const { approveColor, rejectColor, approveTextColor, rejectTextColor } = this.state;
    const { requestData: { id, status }, navigatedPage } = this.props;
    let displayButtons = this.showButtons(approveColor, rejectColor,
      approveTextColor, rejectTextColor, id)
      .map((button)=>{
        const buttonStyle = this.changeButtonColor(button, status);
        return (
          <span key={button.text}>
            <span className="modal__dialog-btn">
              <button
                style={{
                  backgroundColor: `${buttonStyle.backgroundColor}`,
                  color: `${buttonStyle.color}`,
                  cursor: ['Open', 'Approved'].includes(status) ? 'Pointer' : 'default'
                }}
                onClick={this.handleConfirmModal(button.text)}
                className={`${button.class}`}
                id={'b'+button.id}
                type="button"
                disabled={this.disableButtons(status, navigatedPage)}
              >
                {RequestModalHelper.renderButtonText(status, button.text, this.props)}
              </button>
            </span>
          </span>
        );
      });
    return (
      <div className="modal__button-below">{displayButtons}</div>
    );
  }

  renderRequestAprroval = () => {
    const { requestData } = this.props;
    return <RequestApproval requestData={requestData} />;
  }

  renderRequests() {
    const {
      fetchingRequest, error, requestId, redirectLink,
      requestData, user, user: { picture }, email, currentUser
    } = this.props;
    const { modalInvisible, buttonSelected } = this.state;
    const { renderDialogText, handleConfirmModal, handleApprove, handleReject } = this;

    if(!fetchingRequest && !requestData.id ) {
      return <NotFound redirectLink={`/requests${redirectLink}`} errorMessage={error} />;
    }
    return (
      <Fragment>
        <div style={{display:'flex', flexWrap:'wrap', justifyContent: 'space-between'}}>
          <UserInfo requestData={requestData} user={user} />
          {this.shouldButtonsRender(requestData.status)}
          <ConfirmDialog
            id={requestData.id}
            modalInvisible={modalInvisible}
            buttonSelected={buttonTextValuePair[buttonSelected]}
            renderDialogText={renderDialogText}
            closeDeleteModal={handleConfirmModal}
            handleApprove={handleApprove(requestData.id)}
            handleReject={handleReject(requestData.id)}
          />
        </div>
        <div className="request-details">
          {this.renderRequestDetailsHeader(requestData)}
          {RequestModalHelper.getRequestTripsDetails(requestData)}
        </div>
        { ['Approved', 'Verified'].includes(requestData.status) ? <FileAttachment requestId={requestId} /> : '' }
        <AddComment image={picture} />
        <ConnectedCommentBox requestId={requestId} documentId={null} />
        {requestData && ['Approved', 'Rejected'].includes(requestData.status) && this.renderRequestAprroval()}
        <div id="comments">
          <ConnectedUserComments
            comments={requestData.comments ? requestData.comments.slice(0).reverse(): []}
            email={email.result && email.result.email}
            currentUser={currentUser}
          />
        </div>
      </Fragment>
    );
  }

  render() {
    const { fetchingRequest } = this.props;
    return (
      <Fragment>
        { fetchingRequest ? <Preloader /> : this.renderRequests()}
      </Fragment>
    );
  }
}

RequestDetailsModal.propTypes = {
  fetchUserRequestDetails: PropTypes.func,
  updateRequestStatus: PropTypes.func,
  requestId: PropTypes.string,
  user: PropTypes.object,
  requestData: PropTypes.object,
  currentUser: PropTypes.object,
  isStatusUpdating: PropTypes.bool,
  fetchingRequest: PropTypes.bool,
  navigatedPage: PropTypes.string,
  email:PropTypes.object,
  updateError: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  redirectLink:PropTypes.string.isRequired
};

RequestDetailsModal.defaultProps = {
  fetchUserRequestDetails: () => {},
  updateRequestStatus: () => {},
  requestId: '',
  requestData: {},
  currentUser: {},
  user: {},
  isStatusUpdating: false,
  fetchingRequest: false,
  navigatedPage: '',
  email: {},
  updateError: '',
  error: ''
};

const mapStateToProps = (state) => {
  return {
    requestData: state.requests.requestData,
    user: state.auth.user.UserInfo,
    currentUser: state.user.currentUser,
    isStatusUpdating: state.approvals.updatingStatus,
    fetchingRequest: state.requests.fetchingRequest,
    email:state.user.getUserData,
    updateError: state.approvals.error,
    ...state.modal.modal,
    error: state.requests.errors
  };
};

const actionCreators = { fetchUserRequestDetails, updateRequestStatus };

export default connect(mapStateToProps, actionCreators)(RequestDetailsModal);
