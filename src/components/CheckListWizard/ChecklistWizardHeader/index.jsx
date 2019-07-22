import React, { Component } from 'react';
import PageHeader from '../../PageHeader';
import './index.scss';

class ChecklistWizardHeader extends Component {
  render() {
    return (
      <div className="role-panel-header">
        <PageHeader
          title="TRAVEL CHECKLIST BUILDER"
        />
      </div>
    );
  }
}

export default ChecklistWizardHeader;
