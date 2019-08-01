import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Document, Page } from 'react-pdf';
import './index.scss';

class PreviewDocument extends Component {
  state = {
    numPages: 0,
    pageNumber: 1
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };
  
  nextPage = () => {
    const { pageNumber, numPages } = this.state;
    const currentPageNumber = pageNumber;
    let nextPageNumber;

    if (currentPageNumber + 1 > numPages) {
      nextPageNumber = 1;
    } else {
      nextPageNumber = currentPageNumber + 1;
    }
    this.setState({
      pageNumber: nextPageNumber
    });
  };

  previousPage = () => {
    const { pageNumber, numPages } = this.state;
    const currentPageNumber = pageNumber;
    let previousPageNumber;
    if (currentPageNumber - 1 < 1) {
      previousPageNumber = 1;
    } else if(currentPageNumber < numPages) {
      previousPageNumber = currentPageNumber - 1;
    }
    this.setState({
      pageNumber: previousPageNumber
    });
  };

  render() {
    const { pageNumber, numPages } = this.state;
    const { behaviour: { payload } } = this.props;

    return (
      <div>
        {payload ? (
          <div className="page-buttons">
            <button type="button" onClick={this.previousPage}>Previous</button>
            <button type="button" onClick={this.nextPage}>Next</button>
          </div>
        ) : null}
        
        <div className="document">
          <Document
            file={payload}
            onLoadSuccess={this.onDocumentLoadSuccess}
            noData="You have not yet uploaded any PDF file."
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
        <div className="page-number">
          {payload ? (
            <p>
              Page
              {pageNumber}
              {''}
              Of
              {''}
              {numPages}
            </p>
          ) : null}
        </div>
      </div>
    );
  }
}

PreviewDocument.propTypes = {
  behaviour: PropTypes.object.isRequired
};

export default PreviewDocument;
