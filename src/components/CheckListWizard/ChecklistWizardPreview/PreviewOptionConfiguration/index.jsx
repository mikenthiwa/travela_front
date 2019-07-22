import React from 'react';
import PropTypes from 'prop-types';
import PreviewRadio from '../PreviewRadio';

const PreviewOptionConfiguration = ({type, prompt, order, configuration}) => {
  switch (type) {
  case 'radio':
    return (<PreviewRadio prompt={prompt} order={order} configuration={configuration} />);
  case 'checkbox':
    return <div>This is checkbox</div>;
  case 'dropdown':
    return <div>This is dropdown</div>;
  case 'image':
    return <div>This is image</div>;
  case 'video':
    return <div>This is video</div>;
  case 'scale':
    return <div>This is scale</div>;
  default:
    return null;
  }
};

PreviewOptionConfiguration.propTypes = {
  type: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  configuration: PropTypes.shape({options: PropTypes.array}).isRequired,
};

export default PreviewOptionConfiguration;
