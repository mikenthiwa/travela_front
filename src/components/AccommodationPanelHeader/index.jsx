import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import PageHeader from '../PageHeader';
import './AccommodationPanelHeader.scss';

class AccommodationPanelHeader extends PureComponent {
  render() {
    let { openModal } = this.props;
    const modalStatus = openModal;
    return (
      <div className="accommodation">
        <PageHeader
          title="RESIDENCE"
          actionBtn="Add Guest House"
          openModal={modalStatus}
        />
      </div>
    );
  }
}

AccommodationPanelHeader.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default AccommodationPanelHeader;
