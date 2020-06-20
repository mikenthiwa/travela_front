import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import Attachments from '../../../components/RequestsModal/Attachments/Attachments';
import { downloadAttachments } from '../../../redux/actionCreator/attachmentActions';

export class DocumentDetailsAttachment extends Component {
  state = {}

  handleDownloadDocument = (event) => {
    const url = event.target.id;
    const fileName = event.target.name;
    const { downloadDocument } = this.props;
    downloadDocument(url, fileName);
  }

  generateFileName(document) {
    let fileName;
    if (document.type === 'passport') {
      return fileName = `${document.data.nationality} Passport`;
    } else if (document.type === 'visa') {
      return fileName = `${document.data.country} Visa`;
    } else {
      return fileName = `${document.data.name}`;
    }
  }

  render() {
    const { documentData } = this.props;
    const fileSubmissions = [{
      url: documentData.data.cloudinaryUrl,
      fileName: this.generateFileName(documentData)
    }];

    return (
      <Attachments
        fileSubmissions={fileSubmissions}
        isFetching={false}
        handleDownload={this.handleDownloadDocument}
      />
    );
  }
}

DocumentDetailsAttachment.propTypes = {
  documentData: PropTypes.object,
  downloadDocument: PropTypes.func.isRequired,
};

DocumentDetailsAttachment.defaultProps = {
  documentData: {},
};

const mapDispatchToProps = {
  downloadDocument: downloadAttachments
};

export default connect(null, mapDispatchToProps)(DocumentDetailsAttachment);
