import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from './Radio';
import PreviewRadioConfiguration from './PreviewRadioConfiguration';
import SkipToAnotherQuestion from '../PreviewBehaviour/SkipToAnotherQuestion';
import './index.scss';

class PreviewRadio extends Component {
  state = {
    preview: false,
    behaviourName: '',
    payload: 0,
    optionId: null
  }

  handleCheckName = (behaviourName, optionId, payload) =>  {
    this.setState({ behaviourName, optionId, payload, preview: true });
  }

  renderPreviewBehaviour = (preview, behaviourName, handleSkipToQuestion, payload, options) => (
    <div className="display-preview-behaviour">
      {
        preview && options.length ? behaviourName === 'skip to another question' ? (
          <SkipToAnotherQuestion
            handleSkipToQuestion={handleSkipToQuestion}
            payload={payload && payload}
          />
        ) :
          (
            <PreviewRadioConfiguration behaviourName={behaviourName} />
          ) : null
      }
    </div>
  )

  render() {
    const { prompt, configuration, order, handleSkipToQuestion } = this.props;
    const { options } = configuration;
    const { preview, behaviourName, payload, optionId } = this.state;
    return (
      <React.Fragment>
        <div className="radio-grid">
          {options.map(item => (
            <div className="radio-option" key={item.id}>
              <Radio
                order={order}
                radioId={item.id}
                prompt={prompt} 
                options={item} 
                behaviourName={item.behaviour.name}
                payload={item.behaviour.action && item.behaviour.action.payload}
                handleCheckName={this.handleCheckName}
                preview={preview}
                optionId={optionId}
              />
            </div>
          ))}
        </div>
        { this.renderPreviewBehaviour(preview, behaviourName, handleSkipToQuestion, payload, options) }
      </React.Fragment>
    );
  }
}

PreviewRadio.propTypes = {
  prompt: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  configuration: PropTypes.shape({ options: PropTypes.array }).isRequired,
  handleSkipToQuestion: PropTypes.func.isRequired,
};

export default PreviewRadio;
