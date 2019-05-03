import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import countryUtils from '../../../helper/countryUtils';
import SubmissionItem from './SubmissionItem';
import Preloader from '../../Preloader/Preloader';
import '../travelSubmission.scss';

class CheckListSubmissions extends Component {
  renderCheckList = (list, keyIndex) => {
    const {
      fileUploads,
      handleFileUpload,
      postSuccess,
      tripType,
      postSubmission,
      itemsToCheck,
      isUploadingStage2,
      requestId,
      request,
      history,
      shouldOpen,
      modalType,
      handleUserDocumentUpload,
      userReadinessDocument,
      closeModal
    } = this.props;
    const { checklist, destinationName, tripId, tripLocation } = list;
    const countryFlagUrl = countryUtils.getCountryFlagUrl(destinationName);
    const travelTicket =
      checklist.length && checklist.find(item => item.name === 'Travel Ticket');
    return (
      <div key={keyIndex} className="travelCheckList__destination mdl-grid">
        <div className="destination">
          <div className="country-flag">
            <img className="flag" src={countryFlagUrl} alt="country flag" />
          </div>
          { tripLocation }
        </div>
        {
          checklist.length &&
          checklist.map((item) => (
            (
              (item.name !== 'Travel Ticket' || item.submissions.length > 0) &&
              (
                <SubmissionItem
                  key={`${item.id}`}
                  checklistItem={item}
                  travelTicket={travelTicket}
                  checkId={`${tripId}-${item.id}`}
                  fileUploadData={fileUploads}
                  request={request}
                  handleFileUpload={handleFileUpload}
                  requestId={requestId}
                  postSubmission={postSubmission}
                  postSuccess={postSuccess}
                  tripId={tripId}
                  tripType={tripType}
                  itemsToCheck={itemsToCheck}
                  isUploadingStage2={isUploadingStage2}
                  handleUserDocumentUpload={handleUserDocumentUpload}
                  closeModal={closeModal}
                  shouldOpen={shouldOpen}
                  modalType={modalType} history={history}
                  userReadinessDocument={userReadinessDocument}
                />
              ))
          ))
        }
      </div>
    );
  };

  renderSubmissions = () => {
    const { submissions, closeModal } = this.props;
    return (
      <Fragment>
        <div className="travelCheckList">
          {submissions.length ? (
            submissions.map((list, i) => this.renderCheckList(list, i))
          ) : (
            <p className="travelCheckList__not-found">
              There are no checklist items for your selected destination(s).
              Please contact your Travel Department.
            </p>
          )}
        </div>
      </Fragment>
    );
  };

  render() {
    const { isLoading, submissions } = this.props;
    return (
      <Fragment>
        {isLoading && submissions.length ? (
          <Preloader spinnerClass="loader" />
        ) : (
          this.renderSubmissions()
        )}
      </Fragment>
    );
  }
}

CheckListSubmissions.defaultProps = {
  request: {},
  closeModal: () => {},
  isLoading: false,
  shouldOpen: false,
  userReadinessDocument: {},
  modalType: ''
};

CheckListSubmissions.propTypes = {
  postSubmission: PropTypes.func.isRequired,
  submissions: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  handleFileUpload: PropTypes.func.isRequired,
  itemsToCheck: PropTypes.array.isRequired,
  closeModal: PropTypes.func,
  tripType: PropTypes.string.isRequired,
  request: PropTypes.object,
  requestId: PropTypes.string.isRequired,
  postSuccess: PropTypes.array.isRequired,
  fileUploads: PropTypes.object.isRequired,
  isUploadingStage2: PropTypes.array.isRequired,
  handleUserDocumentUpload: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool,
  userReadinessDocument: PropTypes.object,
  modalType: PropTypes.string,
  history: PropTypes.object.isRequired
};

export default CheckListSubmissions;
