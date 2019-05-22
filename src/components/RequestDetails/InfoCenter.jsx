import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import returnTrip from '../../helper/generateTripType';
import StipendDetails from '../Forms/NewRequestForm/Stipend/StipendDetails';
import Modal from '../modal/Modal';

class InfoCenter extends Component {


  showModal = () => {
    const { openModal } = this.props;
    openModal(true);
  }

  renderStipendModal = (shouldOpen, closeModal, total, stipend) => (
    <Modal
      customModalStyles="travel-stipend-modal"
      closeDeleteModal={closeModal}
      width="580px"
      height="600px"
      visibility={shouldOpen? 'visible':'invisible'}
      title="Travel Stipend Breakdown"
    >
      <StipendDetails
        total={total ? `$ ${total}` : 'N/A'}
        travelStipends={stipend}
        isLoading={false}
      />
    </Modal>
  );

  renderPartitions = (name, total, tripType, picture, stipend) => {
    const disabled = Array.isArray(stipend) ? false : true;
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
            Total Stipend
            <button
              type="button"
              onClick={this.showModal}
              className={`info-button--${disabled}`}
              disabled={disabled}
            >
            i
              <span>{disabled ? 'Breakdown Unavailable' : 'Click for Travel Stipend Breakdown'}</span>
            </button>
          </p>
          <p className="text--blue">
            {(total && total !== 'N/A') && `$${total}` || 'N/A'}
          </p>
        </div>
      </Fragment>
    );
  }

  render () {
    const { request, shouldOpen, closeModal } = this.props;
    const {
      name, tripType, picture, stipend
    } = request;
    let total;
    if (Array.isArray(stipend)) {
      if(stipend.length > 0) {
        const totArr = stipend.map(obj => obj.subTotal);
        total = totArr.reduce((acc, num) => acc + num);
      } else {
        total = 0;
      }
    } else {
      total = stipend ? stipend : 'N/A';
    }
    return (
      <div className="row">
        {this.renderPartitions(name, total, tripType, picture, stipend)}
        {this.renderStipendModal(shouldOpen, closeModal, total, stipend)}
      </div>
    );
  }
}

InfoCenter.propTypes = {
  request: PropTypes.object.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default InfoCenter;
