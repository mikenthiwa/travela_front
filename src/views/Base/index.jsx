import React, { Component } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import Utils from '../../helper/Utils';

class Base extends Component {
  getEntriesWithLimit = (limit, url, pagination, fetchEntries) => {
    let query;
    const pages = Math.ceil(pagination.dataCount/limit);
    if (pages < pagination.currentPage) {
      const newUrl = Utils.buildQuery(url, 'page', pages);
      query = Utils.buildQuery(newUrl, 'limit', limit);
    } else {
      query = Utils.buildQuery(url, 'limit', limit);
    }
    fetchEntries(query);
  }

  renderPagination = pagination => {
    return (
      <div className="rp-pagination">
        <Pagination
          currentPage={pagination.currentPage}
          pageCount={pagination.pageCount}
          onPageChange={this.onPageChange}
        />
      </div>
    );
  };
}

export default Base;
