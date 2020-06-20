import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withLoading from '../Hoc/withLoading';
import ContextMenu from '../ContextMenu/ContextMenu';
import MenuItem from '../ContextMenu/MenuItem';
import Pagination from '../Pagination/Pagination';
import DeleteModal from '../../views/Documents/DeleteModal';
import './RegionTable.scss';

export class RegionTable extends PureComponent {
  state = {
    currentPage: 1,
    searchTerm: '',
    pageStart: 0,
    showDeleteModal: false,
    isDeleting: false,
    regionId: '',
  }

  onPageChange = (page) => {
    this.setState((prevState) => {
      const addition = prevState.currentPage < page ? 7 : -7;
      return {
        currentPage: page,
        pageStart: prevState.pageStart + addition,
      };
    });
  }

handleSearchTerm = (e) => {
  this.setState({searchTerm: e.target.value});
}

toggleDeleteModal = (id) => {
  return () => {
    const {  showDeleteModal } = this.state;
    this.setState({ showDeleteModal: !showDeleteModal,  regionId: id, });
  };
}

deleteTravelRegion = () => {
  const { regions, deleteRegion,} = this.props;
  const { regionId } = this.state;
  const deletedRegion = regions.find(region => region.id === Number(regionId));
  deleteRegion(deletedRegion.id);
  this.setState({ showDeleteModal: false,});
};

closeModal = () => {
  const { showDeleteModal } = this.state;
  this.setState({ showDeleteModal: !showDeleteModal,});
}

renderTravelRegionSearch = () => {
  const { searchTerm } = this.state;
  return (
    <div className="search-container">
      <span className="icon">Region</span>
      <input
        className="input-field"
        type="text" placeholder="Search"
        value={searchTerm}
        onChange={this.handleSearchTerm} />
      <button type="button"><span className="fa fa-search search-icon" /></button>
    </div>
  );
};

renderRegions(region) {
  const {handleEditRegion} = this.props;
  return (
    <tr key={region.id} className="table__row table__effects">
      <td
        className="mdl-data-table__cell--non-numeric table__data freeze table__data-pointer">
        <Link
          className="table__data--link button-outline table__id-pointer" to={`/settings/travel-region/${region.id}`}>
          {region.region}
        </Link>
      </td>
      <td className="mdl-data-table__cell--non-numeric table__data pl-sm-120">
        {region.description}
      </td>
      <td className="table__data edit-region">
        {region.id !== 9999 ? 
          (
            <ContextMenu>
              <MenuItem
                classNames="edit"
                onClick={() => 
                  handleEditRegion(region.id)
                }>
                Edit
              </MenuItem>
              <MenuItem
                classNames="delete"
                onClick={this.toggleDeleteModal(region.id)}>
                Delete
              </MenuItem>
            </ContextMenu>
          )
          : null}
      </td>
    </tr>
   
  );
}
  

renderTableHeader() {
  return (
    <tr>
      <th className="mdl-data-table__cell--non-numeric bb-md-0 table__head freeze request_id">
          Region Name
      </th>
      <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100d description-left">
          Description
      </th>
    </tr>
  );
}
  
render() {
  const { regions, } = this.props;
  const { showDeleteModal, pageStart, currentPage, isDeleting, searchTerm} = this.state;
  this.setState({isDeleting: true});
  const list = regions.filter(checkRegion => checkRegion.region.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredList = list.slice(pageStart, pageStart + 7);
  const pageCount = Math.ceil(list.length / 7);
  const body=regions.length  || pageCount > 0 ? (
    <div className="table__container user-roles">
      {this.renderTravelRegionSearch()}
      <table className="mdl-data-table mdl-js-data-table table__requests">
        <thead>
          {this.renderTableHeader()}
        </thead>
        <tbody className="table__body approvals_table_body">
          {filteredList.map((regions) =>(
            this.renderRegions(regions)
          ))
          }
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={this.onPageChange}
      />
      {
        isDeleting ? ( 
          <DeleteModal
            shouldOpen={showDeleteModal}
            title="Delete travel Region"
            closeModal={this.closeModal}
            modalType="delete document"
            documentName="this travel region?"
            handleDelete={this.deleteTravelRegion}
          />
        ): null}
    </div>
  ): (
    <div className="table__requests--empty">
      { 
        'No regions Added' 
      }
    </div>
  );
  return body;
}
}

RegionTable.propTypes = {
  regions: PropTypes.array,
  handleEditRegion: PropTypes.func.isRequired,
  deleteRegion: PropTypes.func.isRequired,
};

RegionTable.defaultProps = {
  regions: [],
};

export default withLoading(RegionTable);
