import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import PageHeader from '../PageHeader';
import './RegionPanelHeader.scss';

class RegionPanelHeader extends PureComponent {
  render() {
    const { openModal } = this.props;
    return (
      <div className="role-panel-header">
        <PageHeader
          title="TRAVEL REGION"
          actionBtn="Add Region"
          openModal={openModal}
        />
      </div>
    );
  }
}

RegionPanelHeader.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default RegionPanelHeader;
