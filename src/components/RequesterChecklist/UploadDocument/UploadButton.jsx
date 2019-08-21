import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const UploadButton = ({onClick, behaviour}) => {
  return ( 
    <Fragment>
      <button 
        className="upload-btn"
        type="button"
        onClick={onClick}>
        {`Upload a new ${behaviour.payload}`}
      </button>
    </Fragment>
  );
};

UploadButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  behaviour: PropTypes.object.isRequired,
};

export default UploadButton;
