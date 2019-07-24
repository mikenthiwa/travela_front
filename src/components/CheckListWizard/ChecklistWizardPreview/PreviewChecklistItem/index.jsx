import React from 'react';
import PropTypes from 'prop-types';
import PreviewOptionConfiguration from '../PreviewOptionConfiguration';


const PreviewChecklistItem = ({ type, prompt, order, configuration, itemBehaviour, handleSkipToQuestion }) => {
  return (
    <div className="preview-checklist-item">
      <div className="single-preview-item">
        <div className="preview-order">{order}</div>
        <div>
          <p className="preview-prompt">{prompt}</p>
          <PreviewOptionConfiguration 
            type={type} 
            handleSkipToQuestion={handleSkipToQuestion}
            prompt={prompt} 
            order={order}
            configuration={configuration} 
            itemBehaviour={itemBehaviour}
          />
        </div>
      </div>
    </div>
  );
};

PreviewChecklistItem.defaultProps = {
  itemBehaviour: {},
};

PreviewChecklistItem.propTypes = {
  type: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  handleSkipToQuestion: PropTypes.func.isRequired,
  configuration: PropTypes.shape({options: PropTypes.array}).isRequired,
  itemBehaviour: PropTypes.shape({
    name: PropTypes.string,
    action: PropTypes.shape({ payload: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) })
  }),
};

export default PreviewChecklistItem;
