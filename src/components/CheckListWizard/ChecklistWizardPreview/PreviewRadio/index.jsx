import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from './Radio';
import PreviewRadioConfiguration from './PreviewRadioConfiguration';
import './index.scss';

class PreviewRadio extends Component {
    state = {
      preview: false,
      behaviourName: '',
      optionId: null
    }

    handleCheckName = (behaviourName, optionId) => {
      this.setState({ behaviourName, preview: true , optionId});
    }

    render() {
      const { prompt, configuration, order } = this.props;
      const { options } = configuration;
      const { preview, behaviourName, optionId } = this.state;
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
                  handleCheckName={this.handleCheckName}
                  preview={preview}
                  optionId={optionId}
                />
              </div>
            ))}
          </div>
          {preview && <PreviewRadioConfiguration behaviourName={behaviourName} />}
        </React.Fragment>
      );
    }
}

PreviewRadio.propTypes = {
  prompt: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired,
  configuration: PropTypes.shape({options: PropTypes.array}).isRequired,
};

export default PreviewRadio;
