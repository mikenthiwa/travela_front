import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from './Radio';
import PreviewBehaviour from '../PreviewBehaviour';
import './index.scss';

class PreviewRadio extends Component {
    state = {
      preview: false,
      optionId: null,
      behaviour: {},
    }

    handleCheckName = (optionId, behaviour) => {
      this.setState({ preview: true , optionId, behaviour });
    }

    render() {
      const { item: { configuration }, handleSkipToQuestion } = this.props;
      const { options } = configuration;
      const { preview, optionId, behaviour } = this.state;
      return (
        <React.Fragment>
          <div className="radio-grid-wrapper">
            <div className="radio-grid">
              {options.map(option => (
                <div className={`radio-option ${option.id === optionId ? 'selected' : ''}`} key={option.id}>
                  <Radio 
                    option={option} 
                    handleCheckName={() => this.handleCheckName(option.id, option.behaviour)}
                    checked={option.id === optionId}
                  />
                </div>
              ))}
            </div>
          </div>
          {preview && <PreviewBehaviour behaviour={behaviour} handleSkipToQuestion={handleSkipToQuestion} />}
        </React.Fragment>
      );
    }
}

PreviewRadio.propTypes = {
  item: PropTypes.object.isRequired,
  handleSkipToQuestion: PropTypes.func.isRequired,
};

export default PreviewRadio;
