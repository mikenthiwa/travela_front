import React from 'react';
import PropTypes from 'prop-types';
import UploadDocument from '../PreviewBehaviour/UploadDocument';

const PreviewRadioConfiguration = ({behaviourName}) => {
  switch (behaviourName) {
  case 'upload a document':
    return (<div className="behaviour-style"><UploadDocument behaviourName={behaviourName} /></div>);
  case 'skip to another question':
    return <div className="behaviour-style">Skip to another question</div>;
  case 'preview document':
    return <div className="behaviour-style">Preview Document</div>;
  case 'notify an email address':
    return <div className="behaviour-style">Notify by email</div>;
  default:
    return <div className="behaviour-style">This option has not been given a behaviour</div>;
  }
};

PreviewRadioConfiguration.defaultProps = {
  behaviourName: ''
};

PreviewRadioConfiguration.propTypes = {
  behaviourName: PropTypes.string.isRequired,
};

export default PreviewRadioConfiguration;
