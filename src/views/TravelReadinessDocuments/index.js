import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import PageHeader from '../../components/PageHeader';
import ReadinessTable from './TravelReadinessDocumentsTable';
import Pagination from '../../components/Pagination/Pagination';
import './TravelReadinessDocuments.scss';
import '../../components/Forms/NewDocumentForm/NewDocumentForm.scss';
import '../../components/Preloader/Preloader.scss';
import { fetchAllUsersReadinessDocuments } from '../../redux/actionCreator/travelReadinessDocumentsActions';

class TravelReadinessDocuments extends Component {
  state = {};
  componentDidMount() {
    const { fetchUsers, location: { search } } = this.props;
    const params = new URLSearchParams(search);
    let searchParams = params.get('search');
    const page = params.get('page') || 1;
    if(!searchParams) searchParams = '';
    const withPagination = `${searchParams}&page=${page}`;
    fetchUsers(withPagination);
  }

  onPageChange = (page) => {
    const { location: { search }, history } = this.props;
    const params = new URLSearchParams(search);
    let searchParams = params.get('search');
    if(searchParams) {
      const searchWithPagination = `search=${searchParams}&page=${page}`;
      history.push(`/trip-planner/travel-readiness?${searchWithPagination}`);
    } else {
      history.push(`/trip-planner/travel-readiness?page=${page}`);
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
    return (
      <Fragment>
        <div className="readiness-header">
          <PageHeader
            title="TRAVEL READINESS"
          />
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
