import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserRequestDetails } from '../../../redux/actionCreator/requestActions';
import Preloader from '../../../components/Preloader/Preloader';
import RequestDetailsPage from '../../../components/RequestsModal/RequestDetails';
import backButton from '../../../images/back-icon.svg';
import './NewRequestPage.scss';
import { fetchTravelChecklist } from '../../../redux/actionCreator/travelChecklistActions';
import { fetchSubmission, postSubmission } from '../../../redux/actionCreator/checkListSubmissionActions';
import { uploadFile } from '../../../redux/actionCreator/fileUploadActions';
import { openModal, closeModal } from '../../../redux/actionCreator/modalActions';
import {
  fetchUserReadinessDocuments } from '../../../redux/actionCreator/travelReadinessDocumentsActions';
import NotFound from '../../ErrorPages/NotFound';

export class NewRequestPage extends Component {
  componentDidMount() {
    const { fetchUserRequestDetails, match: { params: { requestId } },
      fetchTravelChecklist,  fetchUserReadinessDocuments, user } = this.props;
    fetchUserRequestDetails(requestId);
    fetchTravelChecklist(requestId);
    fetchUserReadinessDocuments(user.currentUser.userId);
  }

  handleShowTravelChecklist = (request) => {
    const { fetchTravelChecklist, openModal, fetchSubmission } = this.props;
    const { id: requestId, tripType } = request;
    fetchSubmission({ requestId, tripType });
  };

  renderRequestDetailsPage = () => {
    const { match:{ params: { requestId } },
      requestData, fetchingRequest, currentUser, user, shouldOpen, modalType,
      userReadinessDocument, fetchSubmission, postSubmission, travelChecklists,
      submissionInfo, fileUploads, uploadFile, openModal, closeModal, history
    } = this.props;

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
    const { match:{ params: { requestId } }, fetchingRequest, errors
    } = this.props;
    if(typeof(errors) === 'string' && errors.includes('does not exist')) {
      return <NotFound redirectLink="/requests" errorMessage={errors} />;
    }
    return (
      <Fragment>
        <div>
          <h1 className="page-header__request">
            <Link to="/requests">
              <img src={backButton} className="header__link" alt="back icon" />
            </Link>
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
};

NewRequestPage.defaultProps = {
  fetchUserRequestDetails: () => { },
  requestData: {},
  fetchingRequest: false,
  currentUser: {},
  user: {},
  travelChecklists: {},
  modalType: '', userReadinessDocument: {},
  errors: {}
};

const mapStateToProps = ({ requests, travelChecklist,
  submissions, modal, fileUploads, travelReadinessDocuments, user }) => {
  return {
    ...requests,
    ...modal.modal,
    userReadinessDocument: travelReadinessDocuments.userReadiness.travelDocuments,
    requestData: requests.requestData,
    fetchingRequest: requests.fetchingRequest,
    travelChecklists: travelChecklist,
    submissionInfo: submissions,
    fileUploads, user
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
  fetchUserReadinessDocuments
};

export default connect(mapStateToProps, actionCreators)(NewRequestPage);
