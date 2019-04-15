import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import PageHeader from '../../components/PageHeader';
import ReadinessTable from './TravelReadinessDocumentsTable';
import Pagination from '../../components/Pagination/Pagination';
import TravelReadinessButtons from '../../components/TravelReadinessButtons';
import './TravelReadinessDocuments.scss';
import '../../components/Forms/NewDocumentForm/NewDocumentForm.scss';
import '../../components/Preloader/Preloader.scss';
import { fetchAllUsersReadinessDocuments } from '../../redux/actionCreator/travelReadinessDocumentsActions';

class TravelReadinessDocuments extends Component {
  state = {
    activeButton: '',
  };

  componentDidMount() {
    const { fetchUsers, location: { search } } = this.props;
    const params = new URLSearchParams(search);
    let searchParams = params.get('search');
    let withDocuments = params.get('withDocuments');
    const page = params.get('page') || 1;
    if(!searchParams) searchParams = '';
    const withPagination = `${searchParams}&page=${page}&withDocuments=${withDocuments}`;
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ activeButton : `${withDocuments === 'true' ? 'withDocuments' : 'all'}` });      
    fetchUsers(withPagination);
  }

  

  onPageChange = (page) => {
    const { location: { search }, history } = this.props;
    const params = new URLSearchParams(search);
    let searchParams = params.get('search');
    let withDocuments = params.get('withDocuments') || 'false';
    if(searchParams) {
      const searchWithPagination = `search=${searchParams}&page=${page}`;
      history.push(`/trip-planner/travel-readiness?${searchWithPagination}&withDocuments=${withDocuments}`);
    } else {
      history.push(`/trip-planner/travel-readiness?page=${page}&withDocuments=${withDocuments}`);
    }
  }

  filterListOnClick = (status) => {
    const { location: { search, pathname }, history } = this.props;  
    const params = new URLSearchParams(search);
    const searchQuery = params.get('search') ? `search=${params.get('search')}&` : '';    
    const withDocuments = status === 'withDocuments' ? 'withDocuments=true' : 'withDocuments=false';
    const searchParams = `${searchQuery}${withDocuments}`;
    if(status === 'withDocuments') {
      history.push(`${pathname}?${searchParams}`);
    } else {
      history.push(`${pathname}?${withDocuments}`);
    }
  } 

  renderPagination() {
    const { meta: { pageCount, currentPage } } = this.props;
    return (
      <Pagination 
        currentPage={currentPage}
        pageCount={pageCount} 
        onPageChange={(page) => this.onPageChange(page)} 
      />
    );
  }

  render() {
    const { users, isLoading } = this.props;
    const { activeButton } = this.state;
    return (
      <Fragment>
        <div className="readiness-header travel-readiness-header ">
          <PageHeader
            title="TRAVEL READINESS"
          />
          <div className="readiness-buttons">
            <TravelReadinessButtons
              filterListOnClick={(status) => this.filterListOnClick(status)}
              activeButton={activeButton}
            />          
          </div>
        </div>
        <ReadinessTable isLoading={isLoading} users={users} />
        {!isEmpty(users) && this.renderPagination()}
      </Fragment>
    );
  }
}

const mapStateToProps = ({travelReadinessDocuments}) => ({
  users: travelReadinessDocuments.users,
  meta: travelReadinessDocuments.meta,
  isLoading: travelReadinessDocuments.isLoading,
});

const mapDispatchToProps = {
  fetchUsers: fetchAllUsersReadinessDocuments,
};

TravelReadinessDocuments.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(TravelReadinessDocuments);
