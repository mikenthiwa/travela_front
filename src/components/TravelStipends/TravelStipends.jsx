import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Preloader from '../Preloader/Preloader';
import WithLoadingTravelStipendsCards from './TravelStipendsCards';
import NoTravelStipends from './NoTravelStipends';
import ConfirmDeleteModal from './ConfirmDeleteModal';

class ListTravelStipends extends Component{

  componentDidMount() {
    const { fetchAllTravelStipends } = this.props;
    fetchAllTravelStipends();
  }
  render() {
    const {
      travelStipends: {stipends,  isLoading, selectedStipend, isDeleting},
      modalType, openModal, closeModal, shouldOpen,
      deleteTravelStipend, fetchSingleTravelStipend
    } = this.props;
    return (
      <div>
        {isLoading
          ? <Preloader />
          : (
            <Fragment>
              {stipends.length > 0 ? (
                <div>
                  <ConfirmDeleteModal
                    deleteTravelStipend={deleteTravelStipend}
                    modalType={modalType}
                    closeModal={closeModal}
                    shouldOpen={shouldOpen}
                    selectedStipend={selectedStipend}
                    isDeleting={isDeleting}
                  />
                  <WithLoadingTravelStipendsCards
                    stipends={stipends}
                    openModal={openModal}
                    fetchSingleTravelStipend={fetchSingleTravelStipend}
                  />
                </div>
              ) :
                (<NoTravelStipends />)}
            </Fragment>
          )}
      </div>
    );
  }
}

ListTravelStipends.propTypes = {
  fetchAllTravelStipends: PropTypes.func.isRequired,
  travelStipends: PropTypes.object.isRequired,
  deleteTravelStipend: PropTypes.func.isRequired,
  fetchSingleTravelStipend: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool,
  modalType: PropTypes.string,
};

ListTravelStipends.defaultProps = {
  modalType: '',
  shouldOpen: false,
};

ListTravelStipends.defaultProps = {
  modalType: '',
  shouldOpen: false,
};

export default ListTravelStipends;
