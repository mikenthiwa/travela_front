import React from 'react';
import PropTypes from 'prop-types';

const UploadDocument = ({behaviourName}) => {
  return(
    <label htmlFor="doc-upload" className="custom-file-upload">
      {behaviourName}
      <input
        type="file"
        id="doc-upload"
        className="upload-doc"
      />
    </label>
  );
};

UploadDocument.propTypes = {
  behaviourName: PropTypes.string.isRequired,
};

export default UploadDocument;
