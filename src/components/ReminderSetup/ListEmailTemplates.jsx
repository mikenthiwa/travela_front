import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import WithLoadingEmailTemplatesTable from './EmailTemplatesTable';
import TemplatesPagination from './TemplatesPagination';
import NoTemplates from './NoTemplates';
import TemplateDetailsModal from './TemplateDetailsModal';

class ListEmailTemplates extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {fetchTemplates, location: {search}} = this.props;
    fetchTemplates(search);
  }

  onPageChange = (previousOrNext) => {
    const {
      fetchTemplates, listEmailTemplatesReducer: {pagination: {currentPage}},
      location: {search}
    } = this.props;
    fetchTemplates(`${search}${search ? '&' : '?'}page=${previousOrNext === 'previous' ? currentPage - 1 : currentPage + 1}`);
  };

  renderPagination = (pageCount, currentPage) => {
    return (
      <TemplatesPagination
        onPageChange={this.onPageChange}
        pageCount={pageCount ? pageCount : 1}
        currentPage={currentPage ? currentPage : 1}
      />
    );
  };

  render() {
    const {
      listEmailTemplatesReducer: {templates, pagination, selectedTemplate},
      openModal, closeModal, modalType, shouldOpen,
      fetchOneTemplate, setItemToDisable, history, isLoading
    } = this.props;
    const {pageCount, currentPage} = pagination;
    return (
      <Fragment>
        <WithLoadingEmailTemplatesTable
          templates={templates}
          setItemToDisable={setItemToDisable}
          openModal={openModal}
          fetchOneTemplate={fetchOneTemplate}
          history={history}
          isLoading={isLoading}
        />
        {templates.length > 0 && !isLoading ? (
          <div>
            <TemplateDetailsModal
              closeModal={closeModal} modalType={modalType}
              shouldOpen={shouldOpen} templates={templates}
              history={history}
              selectedTemplate={selectedTemplate} />
            {this.renderPagination(pageCount,currentPage)}
          </div>
        ) :
          ('')}
      </Fragment>
    );
  }
}

ListEmailTemplates.propTypes = {
  fetchTemplates: PropTypes.func.isRequired, 
  listEmailTemplatesReducer: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func,
  shouldOpen: PropTypes.bool,
  modalType: PropTypes.string,
  fetchOneTemplate: PropTypes.func,
  setItemToDisable: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool
};

ListEmailTemplates.defaultProps = {
  modalType: '',
  shouldOpen: false,
  isLoading: false,
  fetchOneTemplate: () => {},
  closeModal: () => { }
};

export default ListEmailTemplates;
