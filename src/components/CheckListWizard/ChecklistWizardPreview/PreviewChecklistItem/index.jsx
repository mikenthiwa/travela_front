import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PreviewOptionConfiguration from '../PreviewOptionConfiguration';

class PreviewChecklistItem extends Component {
  render() {
    const { type, prompt, configuration, order } = this.props;
    return (
      <div className="preview-checklist-item">
        <div className="single-preview-item">
          <div className="preview-order">{order}</div>
          <div>
            <p className="preview-prompt">{prompt}</p>
            <PreviewOptionConfiguration type={type} prompt={prompt} order={order} configuration={configuration} />
          </div>
        </div>
      </div>
    );
  }
}

PreviewChecklistItem.propTypes = {
  type: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  configuration: PropTypes.shape({options: PropTypes.array}).isRequired,
};

export default PreviewChecklistItem;
