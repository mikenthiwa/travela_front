import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import PageHeader from '../../PageHeader';
import './index.scss';

export class ChecklistWizardHeader extends Component {

  redirectToChecklistConfigs = () => {
    const { history } = this.props;
    history.push('/trip-planner/checklist-wizard-interface');
  };

  render() {
    return (
      <div className="checklist-builder-header">
        <div className="role-panel-header">
          <PageHeader
            title="TRAVEL CHECKLIST BUILDER"
            actionBtn="Back"
            actionBtnClickHandler={this.redirectToChecklistConfigs} 
          />
        </div>
      </div>
    );
  }
}

ChecklistWizardHeader.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(ChecklistWizardHeader);
