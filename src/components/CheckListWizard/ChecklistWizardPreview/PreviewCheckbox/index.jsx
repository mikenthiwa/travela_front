import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import PreviewRadioConfiguration from '../PreviewRadio/PreviewRadioConfiguration';
import SkipToAnotherQuestion from '../PreviewBehaviour/SkipToAnotherQuestion';
import './index.scss';

class PreviewCheckbox extends Component {
  state = {
    isChecked: 0,
  }

  handleCheckbox = ({ target }) => {
    const { isChecked } = this.state;
    if (target.checked) {
      this.setState({
        isChecked: isChecked + 1
      });
    } else {
      this.setState({
        isChecked: isChecked - 1
      });
    }
  }

  renderPreviewBehavior = (isChecked, itemBehaviour, handleSkipToQuestion, options) => (
    <div className="display-preview-behaviour">
      {
        isChecked > 0 && options.length ? itemBehaviour && itemBehaviour.name === 'skip to another question' ? (
          <SkipToAnotherQuestion
            handleSkipToQuestion={handleSkipToQuestion}
            payload={itemBehaviour.action.payload}
          />
        ) :
          (
            <PreviewRadioConfiguration
              behaviourName={itemBehaviour.name}
            />
          ) : null
      }
    </div>
  )

  render() {
    const { prompt, configuration: { options }, order, itemBehaviour, handleSkipToQuestion } = this.props;
    const { isChecked } = this.state;
    const behaviourName = itemBehaviour && itemBehaviour.name;
    return (
      <div>
        <div className="checkbox-preview-wrapper">
          <div className="checkbox-input-wrap">
            {options.map(item => (
              <div key={item.id} className="checkbox-option">
                <Checkbox
                  prompt={prompt}
                  options={item}
                  handleCheckbox={this.handleCheckbox}
                  behaviourName={behaviourName}
                />
              </div>
            ))}
          </div>
          { this.renderPreviewBehavior(isChecked, itemBehaviour, handleSkipToQuestion, options) }
        </div>
      </div>
    );
  }
}

PreviewCheckbox.defaultProps = {
  order: 0,
};

PreviewCheckbox.propTypes = {
  prompt: PropTypes.string.isRequired,
  order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  configuration: PropTypes.shape({ options: PropTypes.array }).isRequired,
  handleSkipToQuestion: PropTypes.func.isRequired,
  itemBehaviour: PropTypes.shape({
    name: PropTypes.string,
    action: PropTypes.shape({ payload: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) })
  }).isRequired,
};

export default PreviewCheckbox;
