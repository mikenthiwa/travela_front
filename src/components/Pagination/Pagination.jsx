import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '../buttons/Buttons';
import './_pagination.scss';


class Pagination extends PureComponent {
  renderPaginationButton(id, disabled, page, direction) {
    const { onPageChange } = this.props;
    return (
      <Button
        buttonId={id}
        buttonClass="pagination__button"
        disabled={disabled}
        text={direction}
        onClick={() => onPageChange(page)} />
    );
  }

  renderPage(currentPage, pageCount) {
    return (
      <div className="pagination__items">
        <span className="pagination__page">
          Page
        </span>
        <div className="pagination__current-page" id="current-page">
          { currentPage }
        </div>
          of
        <span className="pagination__all-pages" id="page-count">
          { pageCount }
        </span>
      </div>
    );
  }

  render() {
    const { currentPage, pageCount } = this.props;
    const previousButtonDisabled = currentPage === 1 ? true: false;
    const nextButtonDisabled = currentPage >= pageCount ? true: false;
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;

    return (
      <div>
        <div className="pagination">
          { this.renderPaginationButton(
            'previous-button',
            previousButtonDisabled,
            previousPage,
            'Previous') }
          { this.renderPage(currentPage, pageCount) }
          { this.renderPaginationButton(
            'next-button',
            nextButtonDisabled,
            nextPage,
            'Next') }
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  pageCount: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  currentPage: null,
  pageCount: null,
};

export default Pagination;
