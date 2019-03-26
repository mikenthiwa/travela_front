import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import toast from 'toastr';
import axios from 'axios';
import Cookie from 'cookies-js';
import moment from 'moment';
import CheckListSubmissions from './Submissions/CheckListSubmissions';
import './TravelCheckList.scss';
import CircularProgressBar from './CircularLoader';
import documentIcon from '../../images/document-rect.png';


class TravelCheckListPage extends Component{

  componentDidMount() {
    const { showTravelChecklist, request } = this.props;
    showTravelChecklist(request);
  }

  componentWillReceiveProps(nextProps) {
    const {
      fileUploads: {isUploading, uploadSuccess}, request, submissionInfo: {percentageCompleted}
    } = nextProps;

    const {
      fileUploads: { uploadSuccess: prevUploadSucess}, showTravelChecklist,
      submissionInfo: {percentageCompleted: percentage}
    } = this.props;

    if(percentage !== percentageCompleted){
      showTravelChecklist(request);
    }
  }

    handleFileUpload = async (file, checklistItemId, tripId, checkId, requestId) => {
      const cookie = Cookie.get('jwt-token');
      const { uploadFile, history } = this.props;
      delete axios.defaults.headers.common['Authorization'];
      uploadFile(file.files[0], { checklistItemId, tripId}, checkId, requestId);
      axios.defaults.headers.common['Authorization'] = cookie;
    }

    handleUserDocumentUpload = (modalType) => {
      const { openModal } = this.props;
      this.setState(
        () => openModal(true, modalType)
      );
    }

    returnToRequestPage = () => {
      const { history } = this.props;
      history.push('/requests');
    }
    
   
    renderSubmissionsCard(request) {
      const {
        isFetching, modalType, fileUploads, closeModal, shouldOpen, 
        userReadinessDocument, submissionInfo, fetchSubmission, postSubmission,
        showTravelChecklist, history
      } = this.props;
      const {
        submissions, isUploading, percentageCompleted,
        itemsToCheck, postSuccess, tripType, fetchSuccessMessage
      } = submissionInfo;
      return (
        <Fragment>
          {fetchSuccessMessage && (
            <CheckListSubmissions
              requestId={request.id} request={request} closeModal={closeModal}
              modalType={modalType} postSubmission={postSubmission} tripType={tripType}
              fetchSubmission={fetchSubmission} userReadinessDocument={userReadinessDocument}
              percentageCompleted={percentageCompleted} submissions={submissions}
              itemsToCheck={itemsToCheck} isLoading={isFetching} fileUploads={fileUploads}
              handleFileUpload={this.handleFileUpload} postSuccess={postSuccess}
              isUploadingStage2={isUploading} shouldOpen={shouldOpen}
              handleUserDocumentUpload={this.handleUserDocumentUpload}
              showTravelChecklist={showTravelChecklist}
              history={history}
            />
          )}
        </Fragment>
        
      );
        
    }
    
    renderReadinessProgressBar = (percentage) => {
      const { hideSubmit } = this.props;
      const message = percentage === 100 ?  
        'Travel Team will review your document and advise accordingly' 
        : 'Complete the checklist to continue';
      return (
        <div className="travelCheckList__col-5">
          <Fragment>
            <div className="travelCheckList--card">
              <div className="travelCheckList--card__head">
            Your Travel Readiness
              </div>
          
              <div className="progressBar">
                <div className="progressBar__text">
                  <div className="progressBar__text-head">
                    You are
                  </div>
                  <div className="progressBar__text-foot">
                    Travel Ready
                  </div>
                </div>       
                <CircularProgressBar 
                  percentage={percentage}
                  strokeWidth={10}
                  sqSize={169}
                />
              </div>
              <div className="progressBar__message">
                <p>{message}</p>
              </div>
          
            </div>
            <div className="travelCheckList__row--button-area">
              { !hideSubmit && this.renderSubmitButton(percentage) }
            </div>
          </Fragment>
        </div>

      );
    }

      renderSubmitButton = (percentage) => {
        return(
          
          <div className="travelSubmission--submit-area__button">
            { percentage !== 100 && 
              ( 
                <button type="button" onClick={this.returnToRequestPage} className="" id="save-button">
                Save     
                </button>
              )
            }            
          </div>
         
        );
      }
      
      render() {
        const { request, submissionInfo: {percentageCompleted},
        } = this.props;
        return (
          <div className="travelCheck-list">

            <div className="travelCheckList__row">
              <div className="travelCheckList__col-7">
                <div className="travelCheckList--card">
                  <div className="travelCheckList--card__head">
                    Travel CheckList Required For This Trip
                  </div>
                  { this.renderSubmissionsCard(request) }
                 
                </div>
              </div>
              { this.renderReadinessProgressBar(percentageCompleted) }
            
            </div>
           
            
          </div>
          
        );
      }

}

TravelCheckListPage.propTypes = {
  
  request: PropTypes.object,
  modalType: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  fetchSubmission: PropTypes.func.isRequired,
  postSubmission: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  showTravelChecklist: PropTypes.func,
  submissionInfo: PropTypes.object.isRequired,
  fileUploads: PropTypes.object.isRequired,
  closeModal: PropTypes.func,
  shouldOpen: PropTypes.bool.isRequired,
  userReadinessDocument: PropTypes.object,
  history: PropTypes.object.isRequired,
  hideSubmit: PropTypes.string
};
TravelCheckListPage.defaultProps = {
  request: {},
  isFetching: false,
  modalType: '',
  closeModal: () => {},
  showTravelChecklist: () => {},
  userReadinessDocument: {},
  hideSubmit: null
};
export default TravelCheckListPage;
