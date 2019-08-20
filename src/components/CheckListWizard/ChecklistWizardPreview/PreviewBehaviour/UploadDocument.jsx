import React from 'react';
import PropTypes from 'prop-types';

const UploadDocument = ({ behaviour }) => {
  return behaviour.payload ? (
    <label htmlFor="doc-upload" className="custom-file-upload">
      {`Upload ${behaviour.payload}`}
      <input
        type="file"
        id="doc-upload"
        className="upload-doc"
      />
    </label>
  ) : null;
};

UploadDocument.propTypes = {
  behaviour: PropTypes.object.isRequired,
};

export default UploadDocument;
