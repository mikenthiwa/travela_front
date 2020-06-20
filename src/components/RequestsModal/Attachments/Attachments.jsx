import React, { Component } from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import Preloader from '../../Preloader/Preloader';
import downLoadIcon from '../../../images/icons/attachmentDownload.svg';
import attachmentIcon from '../../../images/icons/attach_file.svg';
import './Attachments.scss';

class Attachments extends Component {
  renderThumbnail = (filename, url) => {
    if (path.extname(url) === '.pdf') {
      return (
        <embed
          src={`${url}#toolbar=0&statusbar=0&page=1`}
          alt={filename[0]}
          className="rectangle-copy"
          type="application/pdf"
        />
      );
    } else {
      return <img src={url} alt={filename[0]} className="rectangle-copy" />;
    }
  };

  render() {
    const { fileSubmissions, isFetching, handleDownload } = this.props;
    return (
      <div className="attachments">
        <div className="attachments-header">
          <img src={attachmentIcon} alt="File" className="icon-content-save" />
          <span className="attachments-title">Attachments</span>
        </div>
        <div className="all-attachments">
          {isFetching ? ( <Preloader spinnerClass="loader" />) : fileSubmissions.length > 0 ? (
            <div className="attachment-modals">
              {fileSubmissions.map(submission => (
                <div className="mask" key={submission.url || 'submission'}> 
                  {/* Some attachements might have same but never same url*/}
                  <div className="rectangle">
                    <a href={submission.url} target="_blank" rel="noopener noreferrer">
                      {this.renderThumbnail(submission.fileName, submission.url)}
                    </a>
                  </div>
                  <div className="rectangle-2">
                    <div className="section-1">
                      <p className="document-name">
                        <a href={submission.url} target="_blank" rel="noopener noreferrer">
                          {submission.fileName}
                        </a>
                      </p>
                    </div>
                    <div className="section-2">
                      <button 
                        type="button" onClick={handleDownload} className="download-btn"
                        id={submission.url}>
                        <img
                          src={downLoadIcon} alt="File" name={submission.fileName}
                          id={submission.url} className="icon-content-save" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div> ) : (<p className="message">No uploaded documents at the moment</p>)}
        </div>
      </div>
    );
  }
}

Attachments.propTypes = {
  fileSubmissions: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleDownload: PropTypes.func.isRequired
};

export default Attachments;
