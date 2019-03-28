import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import MaintainceForm from '../../Forms/MaintainanceForm';
import tick from '../../../images/Tick/tick.svg';
import Modal from '../../modal/Modal';

class RoomLabel extends PureComponent {
  state = {
    showMarkUnavailable: false
  };

  toggleMarkUnavailable = () => {
    this.setState(prevState => ({
      showMarkUnavailable: !prevState.showMarkUnavailable
    }));
  }

  renderMainteinanceForm(type){
    const {closeModal, name, id, status, shouldOpen, addmaintenanceRecord,
      updateMaintenanceRecord, modalType, timelineDateRange, guestHouseId} = this.props;
    return(
      <Modal
        closeModal={closeModal}
        width="480px"
        customModalStyles="room-maintanance"
        visibility={shouldOpen && type === modalType ? 'visible' : 'invisible'}
        title={`Mark ${name} Unavailable`}
      >
        <MaintainceForm
          status={status}
          id={id}
          closeModal={closeModal}
          addmaintenanceRecord={addmaintenanceRecord}
          timelineDateRange={timelineDateRange}
          guestHouseId={guestHouseId}
          updateMaintenanceRecord={updateMaintenanceRecord}
        />
      </Modal>
    );
  }

  renderCheckBox = (statusClass) => {
    const { id, status, openModal, name} = this.props;
    return (
      <div>
        {status ? (
          <div
            role="button"
            tabIndex="0"
            className={`container_room_${statusClass}`}
          />
        ): (
          <div
            role="button"
            tabIndex="0"
            className={`container_room_${statusClass}`}
            onClick={() => openModal(true,  `${name}-${id}`)}
            onKeyDown={() => openModal(true,  `${name}-${id}`)}
          />
        )}
      </div>
    );
  }

  render() {
    const {showMarkUnavailable} = this.state;
    const {name, id, status} = this.props;
    const visibility = showMarkUnavailable ? 'is-visible' : 'is-hidden';
    return (
      <div className="room-name item-row">
        <div>{name}</div>
        <div
          className="ellipsis"
          tabIndex="0"
          role="button"
          onFocus={this.toggleMarkUnavailable}
          onBlur={this.toggleMarkUnavailable}
        >
          &hellip;
          <div className={`mark-unavailable ${visibility}`}>
            {status ? this.renderCheckBox('fault') : this.renderCheckBox('fine')}
            <span>Unavailable</span>
          </div>
        </div>
        {this.renderMainteinanceForm(`${name}-${id}`)}
      </div>
    );
  }
}

RoomLabel.propTypes = {
  closeModal: PropTypes.func.isRequired,
  addmaintenanceRecord: PropTypes.func.isRequired,
  updateMaintenanceRecord: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  status: PropTypes.bool.isRequired,
  timelineDateRange: PropTypes.array.isRequired,
  guestHouseId: PropTypes.string.isRequired,
  modalType: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
RoomLabel.defaultProps = {
  modalType: null
};

export default RoomLabel;
