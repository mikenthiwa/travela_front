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
  fetchRegions,
  deleteRegion,
  editRegion
} from '../../redux/actionCreator/travelRegionActions';
import './Region.scss';

class TravelRegion extends Component{
  state = {
    regionDetail: null,
    regionId: '',
  }

  componentDidMount() {
    const { fetchRegions } = this.props;
    fetchRegions();
  }

  handleAddRegion = () => {
    const {openModal} = this.props;
    this.setState({regionDetail: null});
    openModal(true, 'add travel regions');
  }

  handleEditRegion = (id) => {
    let {openModal, travelRegion } = this.props;
    const regionDetail = travelRegion.find(item => id === item.id);
    this.setState({ regionId: id, regionDetail });
    openModal(true, 'edit travel regions');
  }
 
  renderRegionForm() {
    const { regionErrors, closeModal, shouldOpen, modalType,
      addRegion, isAddingRegion, editRegion, travelRegion, fetchRegions} = this.props;
    const {  regionDetail, regionId } = this.state;
    const editing = /(edit) travel regions/.test(modalType);
    return (
      <Modal
        customModalStyles="modal--add-user"
        visibility={shouldOpen && /(edit|add) travel regions/.test(modalType) ? 'visible' : 'invisible'}
        title={`${editing ? 'Edit' : 'Add'} Travel Region`}
        closeModal={closeModal}
      >
        <AddRegionForm
          addRegion={addRegion}
          errors={regionErrors}
          closeModal={closeModal}
          addingRegion={isAddingRegion}
          regionId={regionId}
          regionDetail={regionDetail}
          myTitle={`${editing ? 'Edit' : 'Add'} Region`}
          editing={editing}
          editRegion={editRegion}
          travelRegion={travelRegion}
          fetchRegions={fetchRegions}
        />
      </Modal>
    );
  }

  renderRegions() {
    const { isLoading, regionErrors, travelRegion, deleteRegion, editRegion } = this.props;
    return (
      <div className="rp-table">
        <WithLoadingRegionTable
          isLoading={isLoading}
          deleteRegion={deleteRegion}
          handleEditRegion={this.handleEditRegion}
          editRegion={editRegion}
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
        <RegionPanelHeader 
          openModal={this.handleAddRegion} 
        />
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
export const mapStateToProps = ({ modal, travelRegion:{regions}, deleteRegion, editRegion}) => ({
  ...modal.modal,
  travelRegion:regions,
  deleteRegion,
  editRegion,
});

TravelRegion.propTypes = {
  travelRegion: PropTypes.array,
  closeModal: PropTypes.func.isRequired,
  fetchRegions: PropTypes.func.isRequired,
  regionErrors: PropTypes.string,
  addRegion: PropTypes.func.isRequired,
  deleteRegion: PropTypes.func.isRequired,
  editRegion: PropTypes.func.isRequired,
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
  editRegion,
  deleteRegion,
};

export default connect(
  mapStateToProps,
  actionCreators
)(TravelRegion);
