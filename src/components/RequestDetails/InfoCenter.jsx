import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import returnTrip from '../../helper/generateTripType';
import StipendDetails from '../Forms/NewRequestForm/Stipend/StipendDetails';
import TravelCosts from '../Forms/NewRequestForm/TravelCosts/TravelCosts';
import Modal from '../modal/Modal';

class InfoCenter extends Component {

  showModal = () => {
    const { openModal } = this.props;
    openModal(true);
  }

  renderStipendModal = (shouldOpen, closeModal) => {
    const {travelCosts: { stipends, flightCosts, hotelEstimates, isLoading }, request: {trips}} = this.props;
    return (
      <Modal
        customModalStyles="travel-stipend-modal"
        closeDeleteModal={closeModal}
        width="100%"
        height="100%"
        visibility={shouldOpen? 'visible':'invisible'}
        title="Travel Stipend Breakdown"
      >
        <div className="modal-info-center-body">
          <TravelCosts
            isLoading={isLoading}
            trips={trips}
            stipends={stipends}
            flightCosts={flightCosts}
            hotelEstimates={hotelEstimates} />
        </div>
      </Modal>
    );
  };

  renderPartitions = (name, tripType, picture) => {
    return (
      <Fragment>
        <div className="partition">
          <p className="text--grey">Requested By</p>
          <p className="text--blue with-image">
            <span className="user-image" style={{ backgroundImage: `url(${picture})` }} />
            {name}
          </p>
        </div>
        <div className="partition">
          <p className="text--grey">Request Type</p>
          <p className="text--blue">
            {returnTrip(tripType)}
          </p>
        </div>
        <div className="partition">
          <p className="text--grey">
            Click for Travel Cost Breakdown
          </p>
          <p className="text--blue">
            <button
              onClick={this.showModal}
              type="button"
              className="bg-btn bg-btn--active" id="stipend-next">
              View Cost Breakdown
            </button>
          </p>
        </div>
      </Fragment>
    );
  }

  render () {
    const { shouldOpen, closeModal, request } = this.props;
    const {
      name, tripType, picture
    } = request;
    return (
      <div className="row">
        {this.renderPartitions(name, tripType, picture)}
        {this.renderStipendModal(shouldOpen, closeModal)}
      </div>
    );
  }
}

InfoCenter.propTypes = {
  request: PropTypes.object.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  travelCosts: PropTypes.object.isRequired,
};

export default InfoCenter;
