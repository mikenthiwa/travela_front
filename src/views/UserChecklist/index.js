import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOneChecklist } from '../../redux/actionCreator/travelChecklistWizardActions';
import Preloader from '../../components/Preloader/Preloader';
import CircularProgressBar from '../../components/TravelCheckList/CircularLoader';
import RenderChecklists  from '../../components/RequesterChecklist/RenderChecklists';
import './UserChecklist.scss';

export class UserChecklist extends Component {
  state = {
    checklistWithResponse: [],
  }
  componentDidMount() {
    const { getOneChecklist, location } = this.props;
    const requestId = location.pathname.split('/')[2];
    getOneChecklist(requestId);
  }

  static getDerivedStateFromProps(props, state) {
    const { checklistWithResponse } = state;
    const { checklist } = props;
    if (!checklistWithResponse.length && checklist.length) {
      return {
        checklistWithResponse: checklist,
      };
    }
    return null;
  }

  handleResponse = (response) => {
    const { checklistWithResponse } = this.state;
    const newChecklist = checklistWithResponse.map(item => {
      const newConfig = item.config.map(checklistItem => checklistItem.id === response.id ? {
        ...checklistItem, response } : checklistItem);
      return { ...item, config: newConfig };
    });
    this.setState({ checklistWithResponse: newChecklist });
  }

  render() {
    const {isLoading, fullName} = this.props;
    const { checklistWithResponse } = this.state;
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
          {!isLoading && <RenderChecklists checklists={checklistWithResponse} handleResponse={this.handleResponse} />}
        </div>
      </div>
    );
  }
}

UserChecklist.propTypes = {
  getOneChecklist: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  fullName: PropTypes.string.isRequired
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
