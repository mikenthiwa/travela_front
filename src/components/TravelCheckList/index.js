import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TravelChecklist from './CheckListItems/TravelChecklist';
import './TravelCheckList.scss';
import CircularProgressBar from './CircularLoader';
import TabView from '../TripTabView/TabView';
import SubmitArea from '../TripTabView/SubmitArea';

class TravelCheckListPage extends Component {
  state = {
    current: 0
  };

  componentDidMount() {
    const { showTravelChecklist, request } = this.props;
    showTravelChecklist(request);
  }

  componentWillReceiveProps(nextProps) {
    const {
      request,
      submissionInfo: { percentageCompleted }
    } = nextProps;
    const {
      showTravelChecklist,
      submissionInfo: { percentageCompleted: percentage }
    } = this.props;
    if (percentage !== percentageCompleted) {
      showTravelChecklist(request);
    }
  }

  handleTabChange = index => {
    this.setState({ current: index });
  };

  handleSubmitArea = stepType => {
    const { current } = this.state;
    let currentTab = stepType === 'back' ? current - 1 : (
      stepType === 'next' ? current + 1 : current
    );
    this.setState({ current: currentTab });
  };

  checkCompletion = (item, completionStatus, requiresFiles, name) => {
    let isComplete = item &&
      (item.userResponse !== null ||
        item.userUpload.fileName !== undefined);
    const duoField = /visa|passport/.test(name.toLowerCase()) && requiresFiles &&
      item && item.userResponse === 'yes';
    isComplete = duoField && item.userUpload.fileName === undefined ? false: isComplete;
    return completionStatus === false ? completionStatus : isComplete;
  };

  checkCompletedTripChecklist = checklists => {
    let completionStatus;
    checklists.map(checklist => {
      const itemToCheck = checklist.destinationName.toLowerCase() !== 'default';
      if (itemToCheck) {
        const { submissions: [item], requiresFiles, name } = checklist;
        completionStatus = this.checkCompletion(item, completionStatus, requiresFiles,name);
      }
    });
    return completionStatus;
  };

  returnToRequestPage = () => {
    const { history } = this.props;
    history.push('/requests');
  };

  render() {
    const { current } = this.state;
    const {
      submissionInfo, postSubmission, request, openModal, closeModal, shouldOpen,
      modalType, uploadFile, userReadinessDocument, fileUploads, downloadAttachments
    } = this.props;
    const { submissions, percentageCompleted, postSuccess } = submissionInfo;
    let tabsData;
    tabsData = submissions.map((list, index) => {
      const location = localStorage.getItem('location');
      const hideActiveTick = true;
      const checkLocation =
        location === list.checklist.destinationName ||
        list.checklist.length === 2;
      const complete = checkLocation
        ? true
        : this.checkCompletedTripChecklist(list.checklist);
      const title = `Trip ${index + 1}`;
      const subTitle = `${list.tripOrigin} to ${list.destinationName}`;
      return { title, subTitle, complete, hideActiveTick };
    });
    const flightTab = { title: 'FLIGHT DETAILS', subTitle: 'Ticket details' };
    tabsData = [...tabsData, flightTab];
    const name = request.name.split(' ')[0];
    return (
      <div>
        <div className="travelCheck-list">
          <div className="travelCheck-list--card">
            <div className="travelCheck-list--card__head">
              <div className="details">
                <p>Your Travel checklist</p>
                {`Hi ${name}, kindly fill in your details to complete your travel checklist`}
              </div>
              <div className="circular-calculator">
                <CircularProgressBar
                  percentage={percentageCompleted}
                  strokeWidth={5}
                  sqSize={50}
                />
              </div>
            </div>
            <div className="travelCheck-list--card__body">
              <TabView
                tabs={tabsData}
                currentTab={current}
                handleTabChange={this.handleTabChange}
              >

                {submissions.map(submission => (
                  <TravelChecklist
                    checklistItems={submission.checklist} key={submission.tripId} tripId={submission.tripId}
                    postSubmission={postSubmission} requestId={request.id} openModal={openModal}
                    closeModal={closeModal} shouldOpen={shouldOpen} modalType={modalType} uploadFile={uploadFile}
                    userReadinessDocument={userReadinessDocument} fileUploads={fileUploads} postSuccess={postSuccess}
                    downloadAttachments={downloadAttachments} destination={submission.destinationName}
                  />
                ))
                }
              </TabView>
            </div>
          </div>
        </div>
        <SubmitArea
          handleSubmitArea={this.handleSubmitArea}
          currentTab={current}
          numTabs={tabsData.length}
        />
      </div>
    );
  }
}

TravelCheckListPage.propTypes = {
  submissionInfo: PropTypes.object.isRequired,
  postSubmission: PropTypes.func.isRequired,
  request: PropTypes.object,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  uploadFile: PropTypes.func.isRequired,
  downloadAttachments: PropTypes.func.isRequired,
  showTravelChecklist: PropTypes.func,
  fileUploads: PropTypes.object.isRequired,
  userReadinessDocument: PropTypes.object,
  history: PropTypes.object.isRequired
};
TravelCheckListPage.defaultProps = {
  request: {},
  modalType: '',
  showTravelChecklist: () => {},
  userReadinessDocument: {}
};
export default TravelCheckListPage;
