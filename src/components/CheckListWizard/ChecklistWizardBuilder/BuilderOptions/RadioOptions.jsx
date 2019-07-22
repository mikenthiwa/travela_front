import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BuilderBehaviour from '../BuilderBehaviour';
import DeleteIcon from '../../Shared/deleteIcon';

class RadioOptions extends Component {
  state = {
    showBehaviourList: false,
    optionId: ''
  };

  showListOfBehaviours = optionId => {
    const { showBehaviourList } = this.state;
    this.setState({ showBehaviourList: !showBehaviourList, optionId });
  };

  renderBehaviour = (updateBehaviour, order, optionNumber) => {
    const { optionId } = this.state;
    return (
      <div>
        <p className="behaviour-placeholder">{`Upon selecting Option ${optionNumber}, enable`}</p>
        <BuilderBehaviour
          updateBehaviour={updateBehaviour}
          order={order}
          optionId={optionId}
        />
      </div>
    );
  };

  render() {
    const { order, updateBehaviour, name, optionId, optionNumber, deleteQuestion } = this.props;
    const { showBehaviourList } = this.state;

    return (
      <div>
        {
          <div>
            <p>{`Enter Option ${optionNumber}`}</p>
            <div className="prompt-item">
              <input id="option-name-input" className="prompt-input" type="text" placeholder="Yes" value={name} onChange={(e) => updateBehaviour(e.target.value, order, optionId, 'name')} />
              <DeleteIcon id="option-del-icon" onClick={() => deleteQuestion(order, optionId)} />
            </div>
            <div className="behaviour-container">
              <div className="set-behaviour-btn-container">
                {showBehaviourList ? null : (
                  <button
                    onClick={() => this.showListOfBehaviours(optionId)}
                    type="button"
                    className="set-behaviour-btn"
                  >
                Set behaviour
                  </button>
                )}
              </div>
              <div>
                {showBehaviourList &&
                this.renderBehaviour(updateBehaviour, order, optionNumber)}
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

RadioOptions.propTypes = {
  order: PropTypes.number.isRequired,
  optionId: PropTypes.number.isRequired,
  optionNumber: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  updateBehaviour: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
};

export default RadioOptions;
