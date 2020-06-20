import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {isEmpty} from 'lodash';
import {PropTypes} from 'prop-types';
import WithLoadingCountryTable from '../../components/CountriesTable';
import PageHeader from '../../components/PageHeader';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/modal/Modal';
import {AddCountryForm} from '../../components/Forms';
import {closeModal, openModal} from '../../redux/actionCreator/modalActions';
import {createCountry, getCountries} from '../../redux/actionCreator/countryActions';
import {fetchRegions} from '../../redux/actionCreator/travelRegionActions';
import './countries.scss';

export class Countries extends Component {
  state = {
    headTitle: 'Add Country'
  };
  componentDidMount() {
    const { getCountries, match: { params }, fetchRegions } = this.props;
    const query = this.createSearchQuery();
    fetchRegions();
    getCountries(params.regionId, query);
  }

  handleAddCountry = () => {
    const { openModal } = this.props;
    this.setState({ headTitle: 'Add Country' });
    openModal(true, 'new model');
  };

  onPageChange = (page) => {
    const { location: { search, pathname }, history} = this.props;
    const parameters = new URLSearchParams(search);
    let searchParams = parameters.get('search');
    if(searchParams) {
      const searchWithPagination = `search=${searchParams}&page=${page}`;
      history.push(`${pathname}?${searchWithPagination}`);
    } else {
      history.push(`${pathname}?page=${page}`);
    }
  };

  createSearchQuery = () => {
    const { location: { search } } = this.props;
    const parameters = new URLSearchParams(search);
    let searchParams = parameters.get('search');
    const page = parameters.get('page') || 1;
    if(!searchParams) searchParams = '';
    return `${searchParams}&page=${page}`;
  };

  determineHeaderTitle(regionName) {
    switch(regionName) {
    case 'default region':
      return 'default countries';
    case 'europe':
      return 'european countries';
    default:
      return `${regionName}n countries`;
    }
  }

  renderCountries() {
    const { isLoading, countryErrors, countries, location: { search } } = this.props;
    const parameters = new URLSearchParams(search);
    let searchParams = parameters.get('search');
    return (
      <div className="rp-table">
        <WithLoadingCountryTable
          searched={searchParams ? true : false}
          isLoading={isLoading}
          countries={countries}
          fetchError={countryErrors}
        />
      </div>
    );
  }

  renderCountryForm() {
    const {
      countryErrors,
      closeModal,
      shouldOpen,
      modalType,
      createCountry,
      isAddingCountry,
      getCountries,
      match: { params }
    } = this.props;
    const { headTitle } = this.state;
    return (
      <Modal
        closeModal={closeModal}
        customModalStyles="modal--add-user"
        width="480px"
        visibility={
          shouldOpen && modalType === 'new model' ? 'visible' : 'invisible'
        }
        title={headTitle}
      >
        <AddCountryForm
          handleAddCountries={createCountry}
          errors={countryErrors}
          closeModal={closeModal}
          fetchCountries={() => getCountries(params.regionId, this.createSearchQuery())}
          regionId={params.regionId}
          addingCountries={isAddingCountry}
        />
      </Modal>
    );
  }

  renderPanelHeader() {
    const {  match: { params }, travelRegion } = this.props;
    const region = travelRegion.find(singleRegion => singleRegion.id === parseInt(params.regionId, 10));
    const regionName = region && this.determineHeaderTitle((region.region).toLowerCase());
    
    return (
      <div className="rp-role__header">
        <div className="country-panel-header">
          <PageHeader
            addLink
            iconLink="/settings/travel-region"
            title={regionName}
            actionBtn="Add Country"
            openModal={this.handleAddCountry}
          />
        </div>
      </div>
    );
  }

  renderPage() {
    const {
      countries,
      meta: { currentPage, pageCount}
    } = this.props;
    return (
      <Fragment>
        {this.renderPanelHeader()}
        {this.renderCountries()}
        {!isEmpty(countries)
          && (
            <Pagination
              currentPage={currentPage}
              pageCount={pageCount}
              onPageChange={(page) => this.onPageChange(page)}
            />
          )
        }
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderCountryForm()}
        {this.renderPage()}
      </Fragment>
    );
  }
}

export const mapStateToProps = ({ modal, country, travelRegion:{regions}}) => ({
  ...modal.modal,
  ...country,
  travelRegion:regions
  
});

Countries.propTypes = {
  travelRegion: PropTypes.array.isRequired,
  countries: PropTypes.array,
  closeModal: PropTypes.func.isRequired,
  getCountries: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  countryErrors: PropTypes.string,
  createCountry: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  openModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  isAddingCountry: PropTypes.bool,
  location: PropTypes.object,
  history: PropTypes.shape({}).isRequired,
  meta: PropTypes.object,
  fetchRegions: PropTypes.func.isRequired
};

Countries.defaultProps = {
  isLoading: false,
  countryErrors: '',
  modalType: '',
  location: { search: '' },
  meta: { currentPage: 1, pageCount: 0, search:'' },
  isAddingCountry: false,
  countries: []
};

const actionCreators = {
  getCountries,
  openModal,
  closeModal,
  createCountry,
  fetchRegions
};

export default connect(
  mapStateToProps,
  actionCreators
)(Countries);
