import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import PageHeader from '../PageHeader';
import '../RolePanelHeader/RolePanelHeader.scss';

class ChecklistPanelHeader extends PureComponent {
  render() {
    const { openModal, location } = this.props;
    return (
      <div className="role-panel-header checklist-header">
        <PageHeader
          title="TRAVEL CHECKLIST"
          actionBtn="Add Item"
          openModal={openModal}
          location={location}
        />
      </div>
    );
  }
}

ChecklistPanelHeader.propTypes = {
  openModal: PropTypes.func.isRequired,
  location: PropTypes.string,
};

ChecklistPanelHeader.defaultProps = {
  location: ''
};

export default ChecklistPanelHeader;
