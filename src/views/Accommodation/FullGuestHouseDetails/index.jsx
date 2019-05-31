import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import Timeline from '../../../components/Timeline';
import GuestHouseDetailCard from '../../../components/GuestHouseDetailCard';
import { initFetchTimelineData } from '../../../redux/actionCreator';
import {
  editAccommodation,
  fetchAccommodation,
  disableAccommodation,
  savingAccommodation
} from '../../../redux/actionCreator/accommodationActions';
import greyBedIcon from '../../../images/icons/accomodation_inactive.svg';
import FemaleIcon from '../../../images/icons/Female.svg';
import MaleIcon from '../../../images/icons/Male.svg';
import UnisexIcon from '../../../images/icons/Unisex.svg';
import Modal from '../../../components/modal/Modal';
import { NewAccommodationForm } from '../../../components/Forms';
import  MaintainceForm  from '../../../components/Forms/MaintainanceForm';
import addmaintenanceRecord,
{ deleteMaintenanceRecord, updateMaintenanceRecord } from '../../../redux/actionCreator/maintenanceAction';
import {
  openModal,
  closeModal
} from '../../../redux/actionCreator/modalActions';
import edit_icon from '../../../images/icons/edit_icon.svg';
import disable_icon from '../../../images/icons/disabled.svg';
import './FullGuestHouseDetails.scss';
import updateRoomState from '../../../redux/actionCreator/roomActionCreator';
import { updateTripRoom } from '../../../redux/actionCreator/tripActions';
import { fetchAvailableRooms } from '../../../redux/actionCreator/availableRoomsActions';
import Preloader from '../../../components/Preloader/Preloader';
import ButtonLoadingIcon from '../../../components/Forms/ButtonLoadingIcon';
import NotFound from '../../ErrorPages';

export class GuestHouseDetails extends PureComponent {
  state = {
    period: 'month',
    startDate: moment().startOf('month'),
    timelineViewType: 'month',
    disableGustHouseButtonState: false,
  }

  genderPolicy = {
    Unisex: UnisexIcon,
    Female: FemaleIcon,
    Male: MaleIcon
  }

  handleOnEdit = () => {
    let { openModal } = this.props;
    openModal(true, 'edit accommodation');
  };

  handleOnDisable = () => {
    let { openModal } = this.props;
    openModal(true, 'disable guesthouse');
  }

  disableGuestHouse = () => {
    this.setState({ disableGustHouseButtonState: true });
    const { disableAccommodation, guestHouse, history } = this.props;
    const { id } = guestHouse;
    disableAccommodation(id, history);
  }

  handlePeriod = (period, startDate, timelineViewType) => {
    this.setState({period, startDate, timelineViewType});
  }

  renderGuestHouseDetailsNameBar = () => {
    const { match, history, guestHouse } = this.props;
    return (
      <div className="guesthouse-details-wrapper--top">
        <div className="details-wrapper-top-right">
          <div
            className="back-button" role="presentation" onClick={history.goBack}
          >
            <div className="arrow">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="guest-house-name">{`${guestHouse.houseName}`}</div>
          <div className="bed-count-label">
            <div>
              <img src={greyBedIcon} alt="ic" />
            </div>
            <div>{this.getBedCount(guestHouse.rooms)}</div>
          </div>
          <div className="genderIcon">
            <img src={`${this.genderPolicy[guestHouse.genderPolicy]}`} alt={guestHouse.genderPolicy} title={guestHouse.genderPolicy} />
          </div>
        </div>
        <div className="guest-house-action-div">
          <div>
            <img src={edit_icon} alt="Edit Link" className="edit-icon" />
            <button
              type="button" className="edit-btn" onClick={this.handleOnEdit}
            >
              Edit Guest House
            </button>
          </div>
          <div>
            <img src={disable_icon} alt="Edit Link" className="edit-icon" />
            <button
              id="handleOnDisableId" type="button" className="edit-btn" onClick={this.handleOnDisable}
            >
              Disable Guest House
            </button>
          </div>
        </div>
      </div>
    );
  };

  fetchTimelineRoomsData = (startDate, endDate) => {
    const { initFetchTimelineData, match } = this.props;
    initFetchTimelineData(match.params.guestHouseId, startDate, endDate);
  };
  getBedCount = rooms => {
    return rooms.reduce((currSum, room) => currSum + room.bedCount, 0);
  };

  isUnderMaintenance = (maintainances, startDate, endDate) => {
    const maintainanceEndDate = moment(maintainances.end);
    const maintainanceStartDate = moment(maintainances.start);
    let acceptableRange = maintainanceEndDate.isBetween(startDate, endDate, null, '[]') ||
    maintainanceStartDate.isBetween(startDate, endDate, null, '[]');
    const specialCase = startDate.isBetween(maintainanceStartDate, maintainanceEndDate, null, '[]') &&
    endDate.isBetween(maintainanceStartDate, maintainanceEndDate, null, '[]');
    return { specialCase, acceptableRange };
  }

  checkMaintenance = room => {
    const { startDate, timelineViewType } = this.state;
    const cloneStart = startDate.clone();
    const endDate = cloneStart.add(2, 'weeks').endOf(`${timelineViewType}`);
    const maintainances = room.maintainances[0];
    if(maintainances){
      let isUnderMaintenance = false;
      const { specialCase, acceptableRange } =
      this.isUnderMaintenance(maintainances, startDate, endDate);
      isUnderMaintenance = acceptableRange || specialCase;
      if( timelineViewType==='week'){
        const weekStartDate = cloneStart.subtract(16, 'days').startOf('week');
        const weekEndDate = weekStartDate.clone().add(1, 'week').subtract(1, 'day');
        const { specialCase, acceptableRange } =
        this.isUnderMaintenance(maintainances, weekStartDate , weekEndDate);
        isUnderMaintenance = acceptableRange || specialCase;
      }
      return isUnderMaintenance;
    }
  }

  getAvailableBedsCount = rooms => {
    if (rooms.length !== 0) {
      const room = (rooms.map(room =>
        room.faulty && this.checkMaintenance(room) ?
          [] : room.beds
      ));
      return room.map(bed => bed? bed.filter(b => !b.booked): []).reduce((acc, val) => acc+val.length, 0);
    }
    return 0;
  };
  getUnavailableBedCount = rooms => {
    const allBeds = this.getBedCount(rooms);
    const availableBeds = this.getAvailableBedsCount(rooms);
    return allBeds - availableBeds;
  };
  callUpdateTripRoom = (tripId, bedId, reason, startDate, endDate) => {
    const { updateTripRoom, match } = this.props;
    const data = {
      bedId,
      reason,
      guestHouseId: match.params.guestHouseId,
      startDate,
      endDate
    };
    updateTripRoom({ tripId, data });
  }

  renderDisableAccommodationModal() {
    const { closeModal, modal, guestHouse } = this.props;
    const { shouldOpen, modalType } = modal;
    const { disableGustHouseButtonState } = this.state;
    return (
      <Modal
        closeModal={closeModal} customModalStyles="delete-checklist-item restore-model-content"
        visibility={shouldOpen && modalType.match('disable guesthouse') ? 'visible' : 'invisible'}
        title={`Disable ${guestHouse.houseName}`}
      >
        <span className="delete-checklist-item__disclaimer restore-checklist-items_span">
          Are you sure you want to disable
          <strong>{guestHouse.houseName}</strong>
        </span>
        <div className="delete-checklist-item__hr delete-checklist-item__left" />
        <div className="delete-checklist-item__footer delete-checklist-item__right">
          <button type="button" className="delete-checklist-item__footer--cancel" onClick={closeModal}>Cancel</button>
          <button id="disableGuestHouseId" disabled={disableGustHouseButtonState} type="button" className="restore-checklist-items__footer--delete" onClick={this.disableGuestHouse}>
            <ButtonLoadingIcon buttonText="Disable" isLoading={disableGustHouseButtonState} />
          </button>
        </div>
      </Modal>
    );
  }


  renderEditAccommodationForm() {
    const {
      closeModal, modal, guestHouse, initFetchTimelineData, isLoading, isSaving,
      fetchAccommodation, editAccommodation, editingAccommodation, savingAccommodation
    } = this.props;
    const { shouldOpen, modalType } = modal;
    return (
      <Modal
        closeModal={closeModal}
        width="800px"
        visibility={shouldOpen && modalType === 'edit accommodation' ? 'visible' : 'invisible'}
        title={`Edit ${guestHouse.houseName}`}
      >
        <NewAccommodationForm
          closeModal={closeModal}
          modalType={modalType || ''}
          fetchAccommodation={fetchAccommodation}
          editAccommodation={editAccommodation}
          editingAccommodation={editingAccommodation}
          isLoading={isLoading}
          isSaving={isSaving}
          guestHouse={guestHouse}
          initFetchTimelineData={initFetchTimelineData}
          savingAccommodation={savingAccommodation}
        />
      </Modal>
    );
  }

  render() {
    const { guestHouse, updateRoomState, availableBeds,fetchAvailableRooms, loadingBeds, maintenance, openModal,closeModal,
      modal, loading, isLoading, addmaintenanceRecord, deleteMaintenanceRecord, updateMaintenanceRecord, maintenanceDetails, accommodation } = this.props;
    const { shouldOpen, modalType } = modal;
    const { period, disableGustHouseButtonState } = this.state;
    return (
      (

        <div className="guesthouse-details-wrapper">
          {this.renderEditAccommodationForm()}
          {this.renderDisableAccommodationModal()}
          <div className="set-details">
            { isLoading ? (
              <Preloader />
            ) : (

              (!guestHouse.id && !guestHouse.houseName && !guestHouse.Location) ?
                <NotFound redirectLink="/residence/manage" errorMessage={accommodation.error} /> :
                (
                  <Fragment>
                    {this.renderGuestHouseDetailsNameBar()}
                    <div className="guesthouse-details-wrapper--key-details">
                      <GuestHouseDetailCard
                        label="Bed Capacity" value={this.getBedCount(guestHouse.rooms)}
                        period=""
                      />
                      <GuestHouseDetailCard
                        label="No. of rooms" value={guestHouse.rooms.length}
                        period=""
                      />
                      <GuestHouseDetailCard
                        label="Vacant spaces"
                        value={this.getAvailableBedsCount(guestHouse.rooms)}
                        period={period} />
                      <GuestHouseDetailCard
                        label="Unavailable"
                        value={this.getUnavailableBedCount(guestHouse.rooms)}
                        period={period}
                      />
                    </div>
                  </Fragment>
                ))}
          </div>
          <Timeline
            modalType={modalType} shouldOpen={shouldOpen} openModal={openModal}
            modal={modal} closeModal={closeModal} handleMaintainence={this.handleMaintainence}
            rooms={guestHouse.rooms} guestHouseId={guestHouse.id || ''} fetchTimelineRoomsData={this.fetchTimelineRoomsData}
            updateRoomState={updateRoomState} addmaintenanceRecord={addmaintenanceRecord}
            deleteMaintenanceRecord={deleteMaintenanceRecord} updateTripRoom={this.callUpdateTripRoom}
            availableBeds={availableBeds} fetchAvailableRooms={fetchAvailableRooms} handlePeriod={this.handlePeriod}
            loadingBeds={loadingBeds} loading={loading} editMaintenance={maintenance}
            updateMaintenanceRecord={updateMaintenanceRecord} maintenanceDetails={maintenanceDetails}
            disableGustHouseButtonState={disableGustHouseButtonState}
          />
        </div>
      ));
  }
}

GuestHouseDetails.propTypes = {
  maintenance: PropTypes.object, guestHouse: PropTypes.object,
  match: PropTypes.object.isRequired, history: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired, closeModal: PropTypes.func.isRequired,
  initFetchTimelineData: PropTypes.func,
  updateRoomState: PropTypes.func.isRequired,
  addmaintenanceRecord:PropTypes.func.isRequired,
  deleteMaintenanceRecord:PropTypes.func.isRequired,
  updateMaintenanceRecord:PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired,
  fetchAccommodation: PropTypes.func.isRequired, editAccommodation: PropTypes.func.isRequired,
  editingAccommodation: PropTypes.bool.isRequired,
  updateTripRoom: PropTypes.func.isRequired, availableBeds: PropTypes.array.isRequired,
  fetchAvailableRooms: PropTypes.func.isRequired, loadingBeds: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired, isLoading: PropTypes.bool.isRequired,
  maintenanceDetails: PropTypes.object, disableAccommodation: PropTypes.func.isRequired,
  accommodation: PropTypes.object, isSaving: PropTypes.bool,
  savingAccommodation: PropTypes.func,
};

GuestHouseDetails.defaultProps = {
  initFetchTimelineData: () => { },
  savingAccommodation: () => {},
  isSaving: false,
  guestHouse: {},
  maintenance: {},
  maintenanceDetails: {},
  accommodation: {
    error: ''
  }
};

const mapStateToProps = (state) => ({
  guestHouse: state.accommodation.guestHouse,
  isLoading: state.accommodation.isLoading,
  isSaving: state.accommodation.isSaving,
  user: state.auth.user.UserInfo,
  modal: state.modal.modal,
  availableBeds: state.availableRooms.beds,
  loadingBeds: state.availableRooms.isLoading,
  loading: state.trips.loading,
  editingAccommodation: state.accommodation.editingAccommodation,
  createAccommodationLoading: state.accommodation.createAccommodationLoading,
  maintenance: state.maintenance,
  maintenanceDetails: state.maintenance,
  accommodation:state.accommodation
});

const actionCreators = {
  initFetchTimelineData, updateRoomState,
  openModal, closeModal, editAccommodation,
  fetchAccommodation, addmaintenanceRecord,
  deleteMaintenanceRecord, updateTripRoom, savingAccommodation,
  fetchAvailableRooms, updateMaintenanceRecord, disableAccommodation
};

export default connect(mapStateToProps, actionCreators)(GuestHouseDetails);
