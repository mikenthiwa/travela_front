import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../../components/modal/Modal';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import {
  createHotelEstimate,
  fetchAllHotelEstimates,
  fetchSingleHotelEstimate
} from '../../redux/actionCreator/hotelEstimateAction';
import { NewHotelEstimateForm } from '../../components/Forms';
import PageHeader from '../../components/PageHeader';
import ListHotelEstimates from '../../components/HotelEstimate/HotelEstimate';

export class HotelEstimates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLocation: false
    };
  }

  componentDidMount() {
    const {
      fetchAllHotelEstimates,
      location
    } = this.props;
    const params = new URLSearchParams(location.search);
    const regionId = params.get('region') || null;
    
    if(regionId){
      fetchAllHotelEstimates(`/region/${regionId}`);
    } else{
      fetchAllHotelEstimates(location.search);
    }
    
    const locationType = params.get('country') || 'false';
    this.setCurrentLocation(locationType);
  }

  setCurrentLocation = activeLocation => {
    this.setState({ activeLocation });
  };

  renderCreateHotelEstimateModal = () => {
    const { openModal } = this.props;
    openModal(true, 'create hotel estimate');
  };

  isActive = buttonState => {
    const { activeLocation } = this.state;
    return activeLocation === buttonState;
  };

  toggleButton = type => {
    const { history } = this.props;
    history.push(`/travel-cost/hotel-estimates?country=${type}`);
  };

  renderLocationTypeButton = (text, active, onclick, otherProps) => {
    let className = 'document-button_group';
    return (
      <button
        className={`${className}${active ? '__active' : '__inactive'}`}
        type="button"
        onClick={onclick}
        {...otherProps}
      >
        {text}
        &ensp;
      </button>
    );
  };

  renderButtonGroup = () => {
    const { meta, history } = this.props;
    return (
      <div className="document_header_group_button">
        <div>
          {this.renderLocationTypeButton(
            'Regions',
            this.isActive('false'),
            () => this.toggleButton(false),
            { id: 'passportButton' }
          )}

          {this.renderLocationTypeButton(
            'Countries',
            this.isActive('true'),
            () => this.toggleButton(true),
            { id: 'visaButton' }
          )}
        </div>
        <button
          onClick={this.renderCreateHotelEstimateModal}
          type="button"
          className="create-new"
        >
          Add Estimate
        </button>
      </div>
    );
  };

  renderNewHotelEstimateForm() {
    const {
      closeModal,
      shouldOpen,
      modalType,
      createHotelEstimate,
      listAllhotelEstimates,
      history,
      fetchSingleHotelEstimate
    } = this.props;
    const editing = /edit hotel estimate/.test(modalType);
    return (
      <Modal
        customModalStyles="modal--add-user"
        width="480px"
        visibility={
          shouldOpen && /(create|edit) hotel estimate/.test(modalType)
            ? 'visible'
            : 'invisible'
        }
        title={editing ? 'Edit Hotel Estimate' : 'Add Hotel Estimate'}
        closeModal={closeModal}
      >
        <NewHotelEstimateForm
          history={history}
          closeModal={closeModal}
          handleCreateHotelEstimate={createHotelEstimate}
          hotelEstimates={listAllhotelEstimates}
          editing={editing}
          fetchSingleEstimate={fetchSingleHotelEstimate}
        />
      </Modal>
    );
  }
  render() {
    const {
      fetchAllHotelEstimates,
      listAllhotelEstimates,
      fetchSingleHotelEstimate,
      openModal,
      closeModal,
      shouldOpen,
      modalType,
      location
    } = this.props;
    const params = new URLSearchParams(location.search);
    const regionId = params.get('region') || null;
    let title = '';

    if(regionId){
      const [region] = listAllhotelEstimates.estimates.filter(estimate => estimate.regionId === regionId);
      title = region ? region.regionName : '';
    }
    return (
      <Fragment>
        <PageHeader title={`${title} HOTEL ESTIMATES`} />
        {this.renderButtonGroup()}
        {this.renderNewHotelEstimateForm()}
        <ListHotelEstimates
          history={history}
          listAllhotelEstimates={listAllhotelEstimates}
          fetchAllHotelEstimates={fetchAllHotelEstimates}
          fetchSingleHotelEstimate={fetchSingleHotelEstimate}
          openModal={openModal}
          closeModal={closeModal}
          shouldOpen={shouldOpen}
          modalType={modalType}
          location={location}
        />
      </Fragment>
    );
  }
}

export const mapStateToProps = ({
  modal,
  listAllhotelEstimates
}) => ({
  ...modal.modal,
  listAllhotelEstimates
});

const actionCreators = {
  openModal,
  closeModal,
  createHotelEstimate,
  fetchAllHotelEstimates,
  fetchSingleHotelEstimate
};

HotelEstimates.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  fetchAllHotelEstimates: PropTypes.func.isRequired,
  listAllhotelEstimates: PropTypes.object,
  fetchSingleHotelEstimate: PropTypes.func.isRequired,
  createHotelEstimate: PropTypes.func,
  history: PropTypes.object
};

HotelEstimates.defaultProps = {
  listAllhotelEstimates: {
    estimates:[]
  },
  openModal: null,
  closeModal: null,
  modalType: '',
  createHotelEstimate: () => {},
  history: {
    push: () => {}
  }
};

export default connect(
  mapStateToProps,
  actionCreators
)(HotelEstimates);
