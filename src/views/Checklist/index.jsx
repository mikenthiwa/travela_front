import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../../components/modal/Modal';
import ChecklistPanelHeader from '../../components/ChecklistPanelHeader';
import { NewChecklistForm, } from '../../components/Forms';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';
import { createTravelChecklist, fetchTravelChecklist, updateTravelChecklist,
  deleteTravelChecklist, fetchDeletedChecklistItems, restoreChecklist
} from '../../redux/actionCreator/travelChecklistActions';
import './index.scss';
import RestoreChecklistItem from '../../components/modal/RestoreChecklistModal';
import DeleteRequestForm from '../../components/Forms/DeleteRequestForm/DeleteRequestForm';
import Preloader from '../../components/Preloader/Preloader';

export class Checklist extends Component {
  state = {itemToEdit: null, deleteReason: '', checklistItemId: '',
    restoreItemData: {}, checklistItemName: '' }
  componentDidMount() {
    const { fetchTravelChecklist, fetchDeletedChecklistItems, location, currentUser } = this.props;
    const locationUrl = new URLSearchParams(location.search);
    const selectedCenter = locationUrl.get('center');
    fetchTravelChecklist(null, selectedCenter || currentUser.location);
    fetchDeletedChecklistItems(selectedCenter || currentUser.location);
  }
  setItemToDelete = (checklistItemId) => () => {
    const { openModal } = this.props;
    this.setState({ checklistItemId: checklistItemId.id, itemName: checklistItemId.name });
    openModal(true, 'delete checklist item');
  }
  setItemToRestore = (checklistItemId) => () => {
    const { openModal, deletedCheckListItems } = this.props;
    const restoreItemData = deletedCheckListItems.find(item => item.id === checklistItemId);
    this.setState({ restoreItemData, checklistItemName: restoreItemData.name, checklistItemId });
    openModal(true, 'restore checklist item');
  }
  manageModal = (action, checklistItem = null) => () => {
    let { openModal, closeModal } = this.props;
    if (action === 'add') { openModal(true, 'add cheklistItem'); }
    if (action === 'edit'){
      this.setState(() => ({itemToEdit: checklistItem})); openModal(true, 'edit cheklistItem'); }
    if (action === 'close-edit-modal') { closeModal(true, 'edit cheklistItem'); }
    if (action === 'close-delete-modal'){ closeModal(); this.setState({ deleteReason: null });}
  }

  handleInputChange = (event) => {
    this.setState({ deleteReason: event.target.value });
  }
  deleteChecklistItem = (event) => {
    event.preventDefault();
    const { deleteTravelChecklist, location } = this.props;
    const locationUrl = new URLSearchParams(location.search);
    const selectedCenter = locationUrl.get('center');
    this.setState({location: selectedCenter});
    const { checklistItemId } = this.state;
    deleteTravelChecklist(checklistItemId, this.state);
    this.setState({ deleteReason: null });
  }
  restoreChecklistItem = () => {
    const { restoreChecklist, checklistItems } = this.props;
    const { checklistItemId, restoreItemData } = this.state;
    restoreChecklist(checklistItemId, restoreItemData);
    this.setState({ deleteReason: null });
  }


  separateChecklistItems = () => {
    const { checklistItems: [thisLocationChecklists] } = this.props;
    const defaultChecklistItems = thisLocationChecklists ?
      thisLocationChecklists.checklist.filter(
        checklist => checklist.destinationName.toLowerCase().match('default')) : [];
    const addedChecklistItems = thisLocationChecklists ?
      thisLocationChecklists.checklist.filter(
        checklist => !checklist.destinationName.toLowerCase().match('default')) : [];

    return { defaultChecklistItems, addedChecklistItems };
  }

  renderChecklistPanelHeader() {
    const { currentUser, location } = this.props;
    const locationUrl = new URLSearchParams(location.search);
    const selectedCenter = locationUrl.get('center');
    return (
      <div className="rp-role__header">
        <ChecklistPanelHeader
          openModal={this.manageModal('add')}
          location={selectedCenter || currentUser.location}
        />
      </div>
    );
  }

  renderDeleteChecklistForm() {
    const { shouldOpen, modalType, deletingChecklist } = this.props;
    const { itemName, deleteReason } = this.state;
    return (
      <DeleteRequestForm
        deletingChecklist={deletingChecklist}
        shouldOpen={shouldOpen} deleteChecklistItem={this.deleteChecklistItem}
        handleInputChange={this.handleInputChange} itemName={itemName} deleteReason={deleteReason}
        closeModal={this.manageModal('close-delete-modal')} modalType={modalType} />
    );
  }

  renderDeletedChecklistItem(deletedChecklistItem) {
    return (
      <div className="checklist-item">
        <div id="deleted-item">{deletedChecklistItem.name}</div>
        <div id="deleted-item">{deletedChecklistItem.deleteReason}</div>
        <button
          type="button" id="restore-btn"
          onClick={this.setItemToRestore(deletedChecklistItem.id)}>
Restore

        </button>
      </div>
    );
  }

  renderRestoreChecklistForm() {
    const { shouldOpen, modalType, updatingChecklist } = this.props;
    const { checklistItemName } = this.state;
    return (
      <RestoreChecklistItem
        closeModal={this.manageModal('close-edit-modal')} shouldOpen={shouldOpen}
        modalType={modalType} itemName={checklistItemName}
        updatingChecklist={updatingChecklist}
        restoreChecklistItem={this.restoreChecklistItem} />
    );
  }
  renderDeletedChecklistItems() {
    const { deletedCheckListItems } = this.props;
    return (
      <div className="">
        { deletedCheckListItems.length !== 0 && deletedCheckListItems.map(deleteItem => {
          return (
            <div key={deleteItem.id}>{this.renderDeletedChecklistItem(deleteItem)}</div>
          );
        }) }
      </div>
    );
  }

  renderChecklistForm() {
    const { closeModal, shouldOpen, modalType, createTravelChecklist,
      updateTravelChecklist, currentUser, fetchTravelChecklist,
      creatingChecklist, updatingChecklist, location
    } = this.props;
    const { itemToEdit } = this.state;
    const modalToRender = modalType === 'edit cheklistItem' || modalType === 'add cheklistItem';
    const locationUrl = new URLSearchParams(location.search);
    const selectedCenter = locationUrl.get('center');
    return (
      <Modal
        customModalStyles="add-checklist-item" closeModal={closeModal} width="480px"
        visibility={shouldOpen && modalToRender ? 'visible' : 'invisible'}
        title={`${modalType === 'edit cheklistItem' ? 'Edit' : 'Add'} Travel Checklist Item`}
      >
        <NewChecklistForm
          creatingChecklist={creatingChecklist}
          updatingChecklist={updatingChecklist}
          closeModal={closeModal} modalType={modalType}
          closeEditModal={this.manageModal('close-edit-modal')}
          createTravelChecklist={createTravelChecklist}
          fetchTravelChecklist={fetchTravelChecklist}
          updateTravelChecklist={updateTravelChecklist}
          checklistItem={itemToEdit}
          currentUser={currentUser}
          selectedCenter={selectedCenter || currentUser.location}
        />
      </Modal>
    );
  }

  renderChecklistPage() {
    const { isLoading, deletedCheckListItems } = this.props;
    const { defaultChecklistItems,  addedChecklistItems } = this.separateChecklistItems();
    const defaultChecklistItem = this.renderDefaultCheckListItems(defaultChecklistItems);
    const disabledMessage = 'There are currently no disabled travel checklist items for your location';

    const currentChecklistItems = (addedChecklistItems.length) ? this.renderChecklistItems()
      : this.renderNoMessage('No new checklist item added yet');
    const deletedItems = (deletedCheckListItems.length !== 0 )
      ? this.renderDeletedChecklistItems() : this.renderNoMessage(disabledMessage);
    return (
      <Fragment>
        {this.renderChecklistPanelHeader()}
        <div className="checklist-page">
          <div id="default-item-header">Default item</div>
          {
            isLoading
              ? <Preloader spinnerClass="loader" />
              : defaultChecklistItem
          }
          <div id="added-item-header">Added Items</div>
          {isLoading ? <Preloader spinnerClass="loader" /> : currentChecklistItems }
          <div id="deleted-item-header">Disabled Items</div>
          {isLoading ? <Preloader spinnerClass="loader" /> : deletedItems }
        </div>
      </Fragment>
    );
  }
  renderChecklistItem(checklistItem, i) {
    return (
      <div className="checklist-item" key={i}>
        <div id="item-name">{checklistItem.name}</div>
        {checklistItem.id && !checklistItem.destinationName.toLowerCase().match('default') && (
          <button type="button" id="edit-btn" onClick={this.manageModal('edit',checklistItem)}>
            Edit
          </button>
        )}
        {checklistItem.id && !checklistItem.destinationName.toLowerCase().match('default') && (
          <button type="button" id="delete-btn" onClick={this.setItemToDelete(checklistItem)}>
            Disable
          </button>
        )}
      </div>
    );
  }

  renderDefaultCheckListItems(defaultChecklistItems) {
    return (
      <div>
        {
          defaultChecklistItems.length
            ? defaultChecklistItems.map((item, i) => this.renderChecklistItem(item, i))
            : this.renderNoMessage('No default checklist item added yet')
        }
      </div>
    );
  }
  renderChecklistItems() {
    const { checklistItems } = this.props;
    return (
      <div className="">
        { checklistItems.length &&
        checklistItems[0].checklist.map((checklistItem, i) => {
          return (
            !checklistItem.name.toLowerCase().includes('travel ticket') && (
              <div key={checklistItem.id}>
                {this.renderChecklistItem(checklistItem, i)}
              </div>
            ));
        }) }
      </div>
    );
  }
  renderNoMessage(message) {
    return (
      <div>
        <div className="checkInTable__trips--empty">{ message }</div>
      </div>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderChecklistForm()}
        {this.renderDeleteChecklistForm()}
        {this.renderChecklistPage()}
        {this.renderRestoreChecklistForm()}
      </Fragment>
    );
  }
}

export const mapStateToProps = ({ modal, travelChecklist, user }) => ({
  ...modal.modal,
  ...travelChecklist,
  currentUser: user.currentUser,
  getCurrentUserRole: user.getCurrentUserRole,
});

const mapDispatchToProps = {
  openModal, closeModal, createTravelChecklist, deleteTravelChecklist,
  fetchTravelChecklist, updateTravelChecklist, fetchDeletedChecklistItems, restoreChecklist
};

Checklist.propTypes = {
  openModal: PropTypes.func.isRequired, closeModal: PropTypes.func.isRequired,
  createTravelChecklist: PropTypes.func.isRequired, fetchTravelChecklist: PropTypes.func.isRequired,
  deleteTravelChecklist: PropTypes.func,
  deletingChecklist: PropTypes.bool,
  updatingChecklist: PropTypes.bool,
  creatingChecklist: PropTypes.bool,
  updateTravelChecklist: PropTypes.func, restoreChecklist: PropTypes.func,
  fetchDeletedChecklistItems: PropTypes.func.isRequired, shouldOpen: PropTypes.bool.isRequired,
  location: PropTypes.object,
  modalType: PropTypes.string, checklistItems: PropTypes.array.isRequired,
  deletedCheckListItems: PropTypes.array, currentUser: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

Checklist.defaultProps = {
  deleteTravelChecklist: () => {}, updateTravelChecklist: () => {}, restoreChecklist: () => {},
  deletedCheckListItems: [], modalType: '',
  deletingChecklist: false,
  creatingChecklist: false,
  updatingChecklist: false,
  location: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Checklist);
