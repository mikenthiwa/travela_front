import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../PageHeader';
import './DocumentsHeader.scss';

class DocumentsHeader extends PureComponent {
  openAddModal = () => {
    const { openModal } = this.props;
    openModal('add document');
  };
  render() {
    return (
      <div className="document-panel-header">
        <PageHeader
          title="DOCUMENTS"
          actionBtn="Add File"
          openModal={this.openAddModal}
        />
      </div>
    );
  }
}

DocumentsHeader.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default DocumentsHeader;
