import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../components/modal/Modal';
import { NewAccommodationForm } from '../../components/Forms';
import AccommodationPanelHeader from '../../components/AccommodationPanelHeader';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import {
  createAccommodation,
  fetchAccommodation,
  editAccommodation,
  fetchDisabledAccommodation,
  restoreDisabledAccommodation,
  savingAccommodation
} from '../../redux/actionCreator/accommodationActions';
import { initFetchTimelineData } from '../../redux/actionCreator';
import WithLoadingCentreGrid from '../../components/CentreGrid';
import ButtonLoadingIcon from '../../components/Forms/ButtonLoadingIcon';
import './Accommodation.scss';

export class Accommodation extends Component {
  state = {
    disabledGuestHouse: {},
  };

  componentDidMount() {
    const { fetchAccommodation, fetchDisabledAccommodation } = this.props;
    fetchAccommodation();
    fetchDisabledAccommodation();
  }

  handleOnRestore = (id) => {
    let { openModal, disabledGuestHouses } = this.props;
    const disabledGuestHouse = disabledGuestHouses.find(item => item.id === id);
    this.setState({ disabledGuestHouse });
    openModal(true, 'restore guesthouse');
  }

  restoreGuestHouse(id) {
    const { restoreDisabledAccommodation } = this.props;
    restoreDisabledAccommodation(id);
  }

  renderAccommodationPanelHeader() {
    let { openModal } = this.props;
    return (
      <div className="rp-role__header">
        <AccommodationPanelHeader openModal={openModal} />
      </div>
    );
  }

  renderAccommodationForm() {
    const {
      closeModal,
      shouldOpen,
      modalType,
      createAccommodation,
      fetchAccommodation,
      editAccommodation,
      createAccommodationLoading,
      savingAccommodation,
      isSaving,
    } = this.props;
    return (
      <div className="guesthouse-modal">
        <Modal
          closeModal={closeModal}
          width="800px"
          visibility={
            shouldOpen && modalType === 'new model' ? 'visible' : 'invisible'
          }
          title="Add Guest House"
        >
          <NewAccommodationForm
            closeModal={closeModal}
            modalType={modalType || ''}
            createAccommodation={createAccommodation}
            fetchAccommodation={fetchAccommodation}
            editAccommodation={editAccommodation}
            createAccommodationLoading={createAccommodationLoading}
            initFetchTimelineData={initFetchTimelineData}
            savingAccommodation={savingAccommodation}
            isSaving={isSaving}
            guestHouse={{}}
          />
        </Modal>
      </div>
    );
  }

  renderRestoreDisabledAccommodationModal = () => {
    const { closeModal, shouldOpen, modalType, isLoading } = this.props;
    const { disabledGuestHouse } = this.state;
    return (
      <Modal
        closeModal={closeModal}
        customModalStyles="delete-checklist-item restore-model-content"
        visibility={
          shouldOpen && modalType.match('restore guesthouse') ? 'visible' : 'invisible'
        }
        title={`Restore ${disabledGuestHouse.houseName}`}
      >
        <span className="delete-checklist-item__disclaimer restore-checklist-items_span">
          Are you sure you want to restore
          <strong>{disabledGuestHouse.houseName}</strong>
        </span>
        <div className="delete-checklist-item__hr delete-checklist-item__left" />
        <div className="delete-checklist-item__footer delete-checklist-item__right">
          <button type="button" className="delete-checklist-item__footer--cancel" onClick={closeModal}>Cancel</button>
          <button type="button" disabled={isLoading} id="restoreGuestHouseId" className="bg-btn bg-btn--active restore-guestHouse-button" onClick={() => this.restoreGuestHouse(disabledGuestHouse.id)}>
            <ButtonLoadingIcon isLoading={isLoading} buttonText="Restore" />
          </button>
        </div>
      </Modal>
    );
  }

  render() {
    const { guestHouses, isLoading, accommodationError, disabledGuestHouses } = this.props;
    return (
      <Fragment>
        {this.renderAccommodationPanelHeader()}
        {this.renderAccommodationForm()}
        {this.renderRestoreDisabledAccommodationModal()}
        <div className="table__container accommodation__container">
          <WithLoadingCentreGrid
            id="handleOnRestoreId" handleOnRestore={this.handleOnRestore}
            guestHouses={guestHouses}
            isLoading={isLoading}
            error={accommodationError}
            disabledGuestHouses={disabledGuestHouses}
          />
        </div>
      </Fragment>
    );
  }
}

Accommodation.propTypes = {
  history: PropTypes.shape({}).isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  createAccommodation: PropTypes.func.isRequired,
  createAccommodationLoading: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  fetchDisabledAccommodation: PropTypes.func.isRequired,
  guestHouses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      houseName: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
      bathRooms: PropTypes.number.isRequired
    })
  ),
  disabledGuestHouses: PropTypes.array,
  isLoading: PropTypes.bool,
  isSaving: PropTypes.bool,
  accommodationError: PropTypes.string,
  fetchAccommodation: PropTypes.func.isRequired,
  editAccommodation: PropTypes.func.isRequired,
  restoreDisabledAccommodation: PropTypes.func.isRequired,
  savingAccommodation: PropTypes.func,
};

Accommodation.defaultProps = {
  guestHouses: [],
  disabledGuestHouses: [],
  accommodationError: '',
  isLoading: false,
  isSaving: false,
  modalType: '',
  savingAccommodation: () => {}
};

const actionCreators = {
  openModal,
  closeModal,
  createAccommodation,
  editAccommodation,
  fetchAccommodation,
  initFetchTimelineData,
  fetchDisabledAccommodation,
  restoreDisabledAccommodation,
  savingAccommodation
};

export const mapStateToProps = ({ accommodation, modal, user }) => ({
  ...accommodation,
  ...modal.modal,
  ...user
});

export default connect(
  mapStateToProps,
  actionCreators
)(Accommodation);
