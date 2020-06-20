import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import PageHeader from '../../PageHeader';
import './index.scss';

export class ChecklistConfigurationsHeader extends Component {

  redirectToChecklistBuilder = () => {
    const { history } = this.props;
    history.push('/trip-planner/checklist-wizard');
  }
  render() {
    const {configFound} = this.props;
    return (
      <div className="role-panel-header">
        <div className="checklist-wizard-header">
          <PageHeader
            title={configFound ? 'TRAVEL CHECKLISTS' : 'TRAVEL CHECKLIST BUILDER'}
            actionBtn={configFound ? 'New Checklist' : ''}
            actionBtnClickHandler={this.redirectToChecklistBuilder} 
          />
        </div>
      </div>
    );
  }
}

ChecklistConfigurationsHeader.propTypes = {
  configFound: PropTypes.bool,
  history: PropTypes.object.isRequired
};

ChecklistConfigurationsHeader.defaultProps = {
  configFound: false
};

export default withRouter(ChecklistConfigurationsHeader);
