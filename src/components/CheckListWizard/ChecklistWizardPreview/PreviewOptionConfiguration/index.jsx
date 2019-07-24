import React from 'react';
import PropTypes from 'prop-types';
import PreviewRadio from '../PreviewRadio';
import PreviewCheckbox from '../PreviewCheckbox';

const PreviewOptionConfiguration = ({ type, order, prompt, configuration, itemBehaviour, handleSkipToQuestion }) => {
  switch (type) {
  case 'radio':
    return (
      <PreviewRadio
        prompt={prompt}
        order={order}
        configuration={configuration}
        handleSkipToQuestion={handleSkipToQuestion}
      />
    );
  case 'checkbox':
    return (
      <PreviewCheckbox
        prompt={prompt}
        order={order}
        handleSkipToQuestion={handleSkipToQuestion}
        configuration={configuration}
        itemBehaviour={itemBehaviour}
      />
    );
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
  handleSkipToQuestion: PropTypes.func.isRequired,
  configuration: PropTypes.shape({options: PropTypes.array}).isRequired,
  itemBehaviour: PropTypes.shape({
    name: PropTypes.string,
    action: PropTypes.shape({ payload: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) })
  }).isRequired,
};

export default PreviewOptionConfiguration;
