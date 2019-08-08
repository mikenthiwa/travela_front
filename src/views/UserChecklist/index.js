import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOneChecklist } from '../../redux/actionCreator/travelChecklistWizardActions';
import Preloader from '../../components/Preloader/Preloader';
import CircularProgressBar from '../../components/TravelCheckList/CircularLoader';
import RenderChecklists  from '../../components/RequesterChecklist/RenderChecklists';
import './UserChecklist.scss';

export class UserChecklist extends Component {
  componentDidMount() {
    const { getOneChecklist, location } = this.props;
    const requestId = location.pathname.split('/')[2];
    getOneChecklist(requestId);
  }
  
  render() {
    const {checklist, isLoading, fullName} = this.props;
    return (
      <div className="smart-checklist">
        <div className="smart-checklist-header">
          <div className="details">
            <p>Your Travel Checklist</p>
            {`Hi ${fullName.split(' ')[0]} kindly fill in your details to complete your travel checklist`}
          </div>
          <div className="circular-calculator">
            <CircularProgressBar 
              sqSize={50}
              strokeWidth={5}
              percentage={0}
            />
          </div>
        </div>
        <div className="smart-checklist-body">
          {isLoading && <Preloader spinnerClass="loader" />}
          {!isLoading && <RenderChecklists checklists={checklist} />}
        </div>
      </div>
    );
  }
}

UserChecklist.propTypes = {
  getOneChecklist: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  checklist: PropTypes.arrayOf(Object),
  location: PropTypes.object.isRequired,
  fullName: PropTypes.string.isRequired
};

UserChecklist.defaultProps = {
  checklist: [{}],
};


const mapStateToProps = ({user, checklistWizard}) => {
  return {
    checklist: checklistWizard.checklist,
    isLoading: checklistWizard.loading,
    fullName: user.currentUser.fullName
  };
};

const mapDispatchToProps = {
  getOneChecklist 
};

export default connect(mapStateToProps, mapDispatchToProps)(UserChecklist);
