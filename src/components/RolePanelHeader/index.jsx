import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import PageHeader from '../PageHeader';
import './RolePanelHeader.scss';

class RolePanelHeader extends PureComponent {
  render() {
    const { openModal } = this.props;
    return (
      <div className="role-panel-header">
        <PageHeader
          title="USER ROLES"
          actionBtn="Add Role"
          openModal={openModal}
        />
      </div>
    );
  }
}

RolePanelHeader.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default RolePanelHeader;
