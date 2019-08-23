import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchChecklistSubmission, updateChecklistSubmission, postChecklistSubmission } from '../../redux/actionCreator/dynamicChecklistSubmissionActions';
import Preloader from '../../components/Preloader/Preloader';
import CircularProgressBar from '../../components/TravelCheckList/CircularLoader';
import RenderChecklists  from '../../components/RequesterChecklist/RenderChecklists';
import './UserChecklist.scss';
import {openModal, closeModal} from '../../redux/actionCreator/modalActions';
import ConfirmSubmitModal from '../../components/RequesterChecklist/ConfirmSubmitModal';

export class UserChecklist extends Component {

  state = {
    hasChanged: false,
    tabIndex: 0,
  }

  componentDidMount() {
    const { fetchChecklistSubmission, location, requestId: reqId } = this.props;
    const requestId = reqId || location.pathname.split('/')[2];
    fetchChecklistSubmission(requestId);
  }

  componentDidUpdate () {
    this.postSubmission();
  }

  setHasChanged = hasChanged => this.setState({ hasChanged })
  
  onTabChange = tabIndex => this.setState({ tabIndex });
  
  onNextButtonClick = () => {
    const { checklists: { length }, completionCount, openModal } = this.props;
    const { tabIndex } = this.state;
    const isCompleted = completionCount === 100;
    
    !(tabIndex === length) && this.onTabChange(tabIndex + 1);
    (tabIndex === length) && isCompleted && (() => {
      openModal(true, 'CHECKLIST_SUBMISSION_MODAL');
    })();
  }
  
  postSubmission = (isSubmitted = false) => {
    const {
      postChecklistSubmission,
      trips,
      checklists,
      id,
    } = this.props;
    const { hasChanged } = this.state;
    const requestId = location.pathname.split('/')[2];

    if(hasChanged || isSubmitted) {
      postChecklistSubmission({
        checklist: {
          trips,
          checklists,
          id,
          isSubmitted,
        },
        requestId
      });
      this.setHasChanged(false);
    }
  }

  handleSubmitChecklist = () => {
    const { closeModal } = this.props;
    this.postSubmission(true);
    closeModal();
  }

  updateChecklistSubmission = data => {
    const { updateChecklistSubmission } = this.props;
    updateChecklistSubmission(data);
    this.setHasChanged(true);
  }

  renderTabButtons () {
    const { checklists: { length }, isSubmitted, completionCount } = this.props;
    const { tabIndex } = this.state;
    const isCompleted = !isSubmitted && (completionCount === 100);

    return (
      <div className="smart-checklist-tab-buttons">
        <button
          className="bg-btn bg-btn--active"
          type="button"
          disabled={!tabIndex}
          onClick={() => this.onTabChange(tabIndex - 1)}
        >
          Back
        </button>
        <button
          className="bg-btn bg-btn--active"
          type="button"
          disabled={!isCompleted && (tabIndex === length)}
          onClick={this.onNextButtonClick}
        >
          Next
        </button>
      </div>
    );
  }
  
  render() {

    const { isLoading, fullName, checklists, trips, isSaving, modal, closeModal, isSubmitted, completionCount } = this.props;
    const { tabIndex } = this.state;
    return (
      <Fragment>
        <ConfirmSubmitModal
          {...modal}
          closeModal={closeModal}
          handleSubmitChecklist={this.handleSubmitChecklist}
        />
        <div className="smart-checklist-wrapper">
          <div className="smart-checklist">
            <div className="smart-checklist-header">
              <div className="details">
                <p>Your Travel Checklist</p>
                {`Hi ${fullName.split(' ')[0]} kindly fill in your details to complete your travel checklist`}
              </div>
              {isSaving && <span>saving</span>}
              <div className="circular-calculator">
                <CircularProgressBar 
                  sqSize={50}
                  strokeWidth={5}
                  percentage={completionCount}
                />
              </div>
            </div>
            <div className="smart-checklist-body">
              {isLoading && <Preloader spinnerClass="loader" />}
              {!isLoading && (
                <RenderChecklists
                  checklists={checklists}
                  trips={trips}
                  handleSubmission={this.updateChecklistSubmission}
                  onTabChange={this.onTabChange}
                  tabIndex={tabIndex}
                  isSubmitted={isSubmitted}
                />
              )}
            </div>
          </div>
          {this.renderTabButtons()}
        </div>
      </Fragment>
    );
  }
}

UserChecklist.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  fullName: PropTypes.string.isRequired
};

const mapStateToProps = ({user, dynamicChecklistSubmission, modal }) => {

  return {
    id: dynamicChecklistSubmission.id,
    checklists: dynamicChecklistSubmission.checklists,
    trips: dynamicChecklistSubmission.trips,
    isLoading: dynamicChecklistSubmission.isLoading,
    isSaving: dynamicChecklistSubmission.isSaving,
    isSubmitted: dynamicChecklistSubmission.isSubmitted,
    completionCount: dynamicChecklistSubmission.completionCount,
    fullName: user.currentUser.fullName,
    modal: modal.modal,
  };
};

const mapDispatchToProps = {
  fetchChecklistSubmission,
  updateChecklistSubmission,
  postChecklistSubmission,
  openModal,
  closeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserChecklist);
