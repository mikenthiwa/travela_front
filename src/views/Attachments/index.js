import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchAttachments,
  downloadAttachments
} from '../../redux/actionCreator/attachmentActions';
import Attachments from '../../components/RequestsModal/Attachments/Attachments';

class FileAttachments extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState) {
      return {
        submissions: nextProps.submissions,
        isFetching: nextProps.isFetching
      };
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      submissions: [],
      isFetching: ''
    };
  }

  componentDidMount() {
    const { requestId, fetchAttachments } = this.props;
    fetchAttachments(requestId);
  }

  getRequiredFileSubmissions(submissions) {
    let files = [];
    submissions.map(destination => {
      destination.checklist.map(checklistItem => {
        if (
          checklistItem.requiresFiles &&
          checklistItem.submissions.length !== 0
        ) {
          files.push(checklistItem.submissions[0].value);
        }
      });
    });
    return files;
  }

  handleDownloadAttachments = e => {
    const url = e.target.id;
    const fileName = e.target.name;
    const { downloadAttachments } = this.props;
    downloadAttachments(url, fileName);
  };

  render() {
    const { submissions, isFetching } = this.state;
    const fileSubmissions = this.getRequiredFileSubmissions(submissions);
    return (
      <Attachments
        fileSubmissions={fileSubmissions}
        isFetching={isFetching}
        handleDownload={this.handleDownloadAttachments}
      />
    );
  }
}

FileAttachments.propTypes = {
  fetchAttachments: PropTypes.func.isRequired,
  downloadAttachments: PropTypes.func.isRequired,
  requestId: PropTypes.string.isRequired
};

const mapStateToProps = ({ attachments }) => ({
  submissions: attachments.submissions,
  isFetching: attachments.isFetching
});

const mapDispatchToProps = {
  fetchAttachments,
  downloadAttachments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileAttachments);
