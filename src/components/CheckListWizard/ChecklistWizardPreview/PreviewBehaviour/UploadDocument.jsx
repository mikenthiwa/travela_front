import React from 'react';
import PropTypes from 'prop-types';

const UploadDocument = ({behaviour}) => {
  return(
    <label htmlFor="doc-upload" className="custom-file-upload">
      {'Upload a document'}
      <input
        type="file"
        id="doc-upload"
        className="upload-doc"
      />
    </label>
  );
};

UploadDocument.propTypes = {
  behaviour: PropTypes.object.isRequired,
};

export default UploadDocument;
