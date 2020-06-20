import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '../buttons/Buttons';
import './templates.scss';


class TemplatesPagination extends PureComponent {
  renderPage = (currentPage, pageCount) =>(
    <div className="pagination__items">
      <span className="pagination__page">Page</span>
      <div className="pagination__current-page" id="current-page">{currentPage}</div>
        of
      <span className="pagination__all-pages" id="page-count">{pageCount}</span>
    </div>
  );

  render() {
    const { currentPage, pageCount, onPageChange } = this.props;
    return (
      <div className="reminder-email-templates">
        <div className="pagination">
          <Button
            buttonId="previous-button"
            buttonClass="pagination__button"
            disabled={currentPage === 1}
            text="Previous"
            onClick={() => onPageChange('previous')} />
          { this.renderPage(currentPage, pageCount) }
          <Button
            buttonId="next-button"
            buttonClass="pagination__button"
            disabled={currentPage >= pageCount}
            text="Next"
            onClick={() => onPageChange('next')} />
        </div>
      </div>
    );
  }
}

TemplatesPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};


export default TemplatesPagination;
