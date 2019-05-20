import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import WithLoadingRegionTable from '../../components/RegionTable';
import RegionPanelHeader from '../../components/RegionPanelHeader';
import Modal from '../../components/modal/Modal';
import AddRegionForm from '../../components/Forms/AddRegionForm';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import {
  addRegion,
  fetchRegions
} from '../../redux/actionCreator/travelRegionActions';
import './Region.scss';

class TravelRegion extends Component{
  state = {
    headTitle: 'Add Region',
    regionDetail: null
  }
  componentDidMount() {
    const { fetchRegions } = this.props;
    fetchRegions();
  }

  handleAddRegion = () => {
    const {openModal} = this.props;
    this.setState({headTitle: 'Add Region', regionDetail: null});
    openModal(true, 'new model');
  }
  renderRegionForm() {
    const { regionErrors, closeModal, shouldOpen, modalType,
      addRegion, isAddingRegion, isLoading } = this.props;
    const { headTitle, regionDetail } = this.state;
    return (
      <Modal
        closeModal={closeModal}
        customModalStyles="modal--add-user" width="480px"
        visibility={shouldOpen && modalType === 'new model' ? 'visible' : 'invisible'}
        title={headTitle}>
        <AddRegionForm
          addRegion={addRegion}
          errors={regionErrors}
          closeModal={closeModal}
          addingRegion={isAddingRegion}
          regionDetail={regionDetail}
          myTitle={headTitle}
        />
      </Modal>
    );
  }
  renderRegions() {
    const { isLoading, regionErrors,travelRegion } = this.props;
    return (
      <div className="rp-table">
        <WithLoadingRegionTable
          isLoading={isLoading}
          regions={travelRegion}
          fetchError={regionErrors}
        />
      </div>
    );
  }
  // renderUserRegionPanelHeader
  renderPanelHeader() {
    return(
      <div className="rp-region__header">
        <RegionPanelHeader openModal={this.handleAddRegion} />
      </div>
    );
  }

  renderPage() {
    return (
      <Fragment>
        {this.renderPanelHeader()}
        {this.renderRegions()}
      </Fragment>
    );
  }
  
  render() {
    return (
      <Fragment>
        {this.renderRegionForm()}
        {this.renderPage( )}
      </Fragment>
    );
  }
  
}
// export default TravelRegion;
export const mapStateToProps = ({ modal, travelRegion:{regions}}) => ({
  ...modal.modal,
  travelRegion:regions
});

TravelRegion.propTypes = {
  travelRegion: PropTypes.array,
  closeModal: PropTypes.func.isRequired,
  fetchRegions: PropTypes.func.isRequired,
  regionErrors: PropTypes.string,
  addRegion: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  openModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  isAddingRegion: PropTypes.bool,
};

TravelRegion.defaultProps = {
  isLoading: false,
  regionErrors: '',
  modalType: '',
  isAddingRegion: false,
  travelRegion:[]
};

const actionCreators = {
  fetchRegions,
  openModal,
  closeModal,
  addRegion,
};

export default connect(
  mapStateToProps,
  actionCreators
)(TravelRegion);
