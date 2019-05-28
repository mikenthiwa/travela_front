import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserRequestDetails } from '../../../redux/actionCreator/requestActions';
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

export class NewRequestPage extends Component {
  componentDidMount() {
    const { fetchUserRequestDetails, match: { params: { requestId } },
      fetchTravelChecklist,  fetchUserReadinessDocuments, user, fetchRoleUsers } = this.props;
    fetchUserRequestDetails(requestId);
    fetchTravelChecklist(requestId);
    fetchRoleUsers(53019);
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
      submissionInfo, fileUploads, uploadFile, openModal, closeModal, history, managers
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
      />
    );
  };

  render() {
    const { match:{ params: { requestId } }, fetchingRequest, history, errors
    } = this.props;
    if(typeof(errors) === 'string' && errors.includes('does not exist')) {
      return <NotFound redirectLink="/requests" errorMessage={errors} />;
    }
    return (
      <Fragment>
        <div>
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
        </div>
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
  uploadFile: PropTypes.func.isRequired,
  fetchTravelChecklist: PropTypes.func.isRequired,
  fetchUserReadinessDocuments: PropTypes.func.isRequired,
  fetchSubmission: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  fetchRoleUsers: PropTypes.func.isRequired,
  managers: PropTypes.array.isRequired,
};

NewRequestPage.defaultProps = {
  fetchUserRequestDetails: () => { },
  requestData: {},
  fetchingRequest: false,
  currentUser: {},
  user: {},
  travelChecklists: {},
  modalType: '', userReadinessDocument: {},
  errors: {},
};

const mapStateToProps = ({ requests, travelChecklist, role,
  submissions, modal, fileUploads, travelReadinessDocuments, user }) => {
  return {
    ...requests,
    ...modal.modal,
    userReadinessDocument: travelReadinessDocuments.userReadiness.travelDocuments,
    requestData: requests.requestData,
    fetchingRequest: requests.fetchingRequest,
    travelChecklists: travelChecklist,
    submissionInfo: submissions,
    fileUploads, user,
    managers: role.roleUsers
  };
};

const actionCreators = {
  fetchUserRequestDetails,
  fetchTravelChecklist,
  fetchSubmission,
  postSubmission,
  uploadFile,
  openModal,
  closeModal,
  fetchUserReadinessDocuments,
  fetchRoleUsers
};

export default connect(mapStateToProps, actionCreators)(NewRequestPage);
