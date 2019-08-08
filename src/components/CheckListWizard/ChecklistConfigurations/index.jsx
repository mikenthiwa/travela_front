/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import './index.scss';
import ContextMenu from '../../ContextMenu/ContextMenu';
import Preloader from '../../Preloader/Preloader';
import MenuItem from '../../ContextMenu/MenuItem';
import Pagination from '../../Pagination/Pagination';
import pluralize from '../../../helper/pluralize';
import DeleteModal from '../../../views/Documents/DeleteModal';
import RestoreModal from '../../modal/RestoreChecklistModal';

export class ChecklistConfigurations extends React.Component {

  state = {
    searchTerm: '',
    currentPage: 1,
    pageStart: 0,
    hover: {
      name: '',
    },
    showDeleteModal: false,
    showRestoreModal: false,
    checklistId: null,
    restoreAll: false
  }

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  }

  onPageChange = (page) => {
    this.setState((prevState) => {
      const addition = prevState.currentPage < page ? 10 : -10;
      return {
        currentPage: page,
        pageStart: prevState.pageStart + addition,
      };
    });
  }

  renderConfigSearch = () => {
    const { searchTerm } = this.state;
    return (
      <div className="search-container">
        <span className="icon">Nationality</span>
        <input
          className="input-field"
          type="text" placeholder="Search"
          value={searchTerm}
          onChange={this.handleChange} />
        <button type="button"><span className="fa fa-search search-icon" /></button>
      </div>
    );
  };

  formatDestinations = (destinations) => {
    return destinations.reduce((acc, curr, index, array) => {
      let place;
      place = (!curr.country) ? curr.region.region : curr.country.country;
      if (!index) {
        return place;
      }
      if (!array[index + 1]) {
        return `${acc} and ${place}`;
      }
      return `${acc}, ${place}`;
    }, '');
  }

  showExtraDestination = (name) => {
    this.setState({ hover: { name } });
  }

  removeExtraDestination = () => {
    this.setState({ hover: { name: '' } });
  }

  renderChecklistConfig = (id, name, config, createdBy, createdAt, destinations) => {
    const numOfItems = config.length;
    const { hover } = this.state;
    return (
      <div className="checklist-card" key={id}>
        <div className="card-header">
          <div className="card-title">{name}</div>
          <div className="travel_stipend_menu">
            <ContextMenu classNames="table__menu-container">
              <MenuItem
                classNames="edit"
              >
                <Link to={`/trip-planner/checklist-wizard/edit-checklist/${id}`} className="edit">Edit</Link>
              </MenuItem>
              <MenuItem
                classNames="delete"
                onClick={this.toggleDeleteModal}
              >
                <span id={id} className="delete">Delete</span>
              </MenuItem>
              <MenuItem
                classNames="edit"
              >
                <Link to={`/trip-planner/checklist-wizard?make_copy=${id}`} className="edit">Make a copy</Link>
              </MenuItem>
            </ContextMenu>
          </div>
        </div>
        <div className="card-body">
          <div>
            <div className="subtitle-heading">No of items</div>
            <div className="subtitle-text">{numOfItems}</div>
          </div>
          <div className="destination-wrapper">
            <div className="subtitle-heading">Applicable to</div>
            <div
              className="subtitle-text"
              onMouseEnter={() => (this.showExtraDestination(name))}
              onMouseLeave={this.removeExtraDestination}
            >
              {pluralize(destinations.length, 'destination')}
            </div>
            {hover.name === name && <div className="expanded-destination">{this.formatDestinations(destinations)}</div>}
          </div>
          <div>
            <div className="subtitle-heading">Created On</div>
            <div className="subtitle-text">{moment(createdAt).format('DD/MM/YYYY')}</div>
          </div>
          <div>
            <div className="subtitle-heading">Created by</div>
            <div className="subtitle-text">{createdBy}</div>
          </div>
        </div>
      </div>
    );
  };

  toggleDeleteModal = (e) => {
    const { showDeleteModal } = this.state;
    this.setState({
      showDeleteModal: !showDeleteModal,
      checklistId: e.target.id
    });
  }

  deleteChecklist = () => {
    const { checklists, deleteChecklist } = this.props;
    const { checklistId } = this.state;
    const deletedChecklist = checklists.find(checklist => checklist.id === Number(checklistId));

    deleteChecklist(deletedChecklist, checklistId);
    this.setState({ showDeleteModal: false });
  };

  toggleRestoreModal = (e) => {
    const { showRestoreModal, restoreAll } = this.state;
    this.setState({
      showRestoreModal: !showRestoreModal,
      restoreAll: false,
      checklistId: e.target.id
    });
  };

  toggleRestoreAllChecklistModal = () => {
    const { showRestoreModal, restoreAll } = this.state;
    this.setState({
      showRestoreModal: !showRestoreModal,
      restoreAll: !restoreAll
    });
  }

  restoreAChecklist = () => {
    const { deletedChecklists, restoreChecklist } = this.props;
    const { checklistId } = this.state;
    const restoredChecklist = deletedChecklists.find(checklist => checklist.id === Number(checklistId));
    restoreChecklist(restoredChecklist, checklistId);
    this.setState({ showRestoreModal: false });
  };

  restoreAllChecklists = () => {
    const { restoreAllChecklists } = this.props;
    restoreAllChecklists();
    this.setState({ showRestoreModal: false });
  };

  renderDisabledChecklists = (deletedChecklists, showDeleteModal, showRestoreModal, restoreAll) => (
    <div className="disabled-checklists-wrapper">
      <DeleteModal
        shouldOpen={showDeleteModal}
        closeModal={this.toggleDeleteModal}
        modalType="delete document"
        documentName="this checklist?"
        handleDelete={this.deleteChecklist}
      />
      <RestoreModal
        shouldOpen={showRestoreModal}
        closeModal={restoreAll ? this.toggleRestoreAllChecklistModal : this.toggleRestoreModal}
        modalType="restore checklist item"
        itemName={restoreAll ? 'all' : 'this'}
        restoreChecklistItem={restoreAll ? this.restoreAllChecklists : this.restoreAChecklist}
      />
      <div className="disabled-checklist-header-wrapper">
        <span className="disabled-checklist-header title">DISABLED CHECKLISTS</span>
        <div className="restore-checklists-wrap">
          <button
            className="restore-all-checklists"
            disabled={!deletedChecklists.length}
            onClick={this.toggleRestoreAllChecklistModal}
            type="button">
            Restore All
          </button>
        </div>
      </div>
      <div className="disabled-checklist-lists">
        {
          deletedChecklists.length ? deletedChecklists.map(({ id, name, createdBy: { fullName } }) => (
            <div className="checklist-restore" key={id}>
              <div className="checklist-content-wrap">
                <span>{name}</span>
                <span className="fullname">{fullName}</span>
              </div>
              <button type="button" className="restore-checklist" id={id} onClick={this.toggleRestoreModal}>Restore</button>
            </div>
          )) :
            (
              <div className="disabled-checklist-lists">
                <p className="no-checklist">There are no disabled checklists at the moment</p>
              </div>
            )
        }
      </div>
    </div>
  )

  render() {
    const { checklists, deletedChecklists, isDeleting, isRestoring } = this.props;
    const { searchTerm, pageStart, currentPage, showDeleteModal, showRestoreModal, restoreAll } = this.state;
    const list = checklists.filter(checklist => checklist.name.toLowerCase()
      .includes(searchTerm.toLowerCase()));
    const filteredList = list.slice(pageStart, pageStart + 10);
    const pageCount = Math.ceil(list.length / 10);
    return (
      <div>
        {(isDeleting || isRestoring) && <Preloader spinnerClass="loader" />}
        {this.renderConfigSearch()}
        <div className="checklist-cards">
          {filteredList.map(({ id, name, config, createdBy, createdAt, destinations }) => (
            this.renderChecklistConfig(id, name, config, createdBy.fullName, createdAt, destinations)
          ))}
        </div>
        {pageCount > 0 ? (
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={this.onPageChange}
          />
        ) : (<div>No Checklist found</div>)
        }
        {this.renderDisabledChecklists(deletedChecklists, showDeleteModal, showRestoreModal, restoreAll)}
      </div>
    );
  }
}

ChecklistConfigurations.defaultProps = {
  deleteChecklist: PropTypes.func,
  restoreChecklist: PropTypes.func,
  restoreAllChecklists: PropTypes.func,
  isDeleting: false,
  isRestoring: false
};

ChecklistConfigurations.propTypes = {
  checklists: PropTypes.array.isRequired,
  deletedChecklists: PropTypes.array.isRequired,
  deleteChecklist: PropTypes.func,
  restoreChecklist: PropTypes.func,
  restoreAllChecklists: PropTypes.func,
  isDeleting: PropTypes.bool,
  isRestoring: PropTypes.bool,
};

export default withRouter(ChecklistConfigurations);
