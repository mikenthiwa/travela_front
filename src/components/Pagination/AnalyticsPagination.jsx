import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './_analyticsPagination.scss';

class AnalyticsPagination extends PureComponent{
  handleClick = (e) => {
    const { handlePagination } = this.props;
    const { target: { id, classList } } = e;
    if (!classList.contains('disabled')){
      handlePagination(id);
    }
  }
  renderPaginationBtn (direction, previousButtonDisabled, nextButtonDisabled) {
    const { pagination: {currentPage, pageCount, prevPage } } = this.props;
    const renderButton = (text, disabled, previousButtonDisabled, nextButtonDisabled) => (
      <button
        id={text} 
        className={(previousButtonDisabled || nextButtonDisabled) ? `pg--button ${disabled && 'button-disabled'}` :`pg--button ${disabled }`}
        onClick={this.handleClick} 
        type="button">
        {text}
      </button>
    );

    switch (direction) {
    case 'Previous':
      return renderButton(direction, prevPage === 0, previousButtonDisabled);
    case 'Next':
      return renderButton(direction, currentPage === pageCount, nextButtonDisabled);
    }
  }

  render () {
    const {pagination: {currentPage, pageCount}} = this.props;
    const previousButtonDisabled = currentPage === 1 ? true: false;
    const nextButtonDisabled = currentPage >= pageCount ? true: false;
    return(
      <div className="pg--container">
        { this.renderPaginationBtn('Previous', previousButtonDisabled, nextButtonDisabled) }
        <span className="pg--text">
          { `Showing page ${currentPage} of ${pageCount} ${pageCount > 1 ? 'pages' : 'page'}` }
        </span>
        { this.renderPaginationBtn('Next', previousButtonDisabled, nextButtonDisabled) }
      </div>
    );
  }
}

AnalyticsPagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  handlePagination: PropTypes.func.isRequired
};

export default AnalyticsPagination;
