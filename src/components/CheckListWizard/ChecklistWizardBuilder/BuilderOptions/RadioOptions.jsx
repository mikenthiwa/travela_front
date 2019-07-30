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

  changeBehaviour = () => {
    const { updateBehaviour } = this.props;
    const { optionId } = this.state;
    return behaviour => updateBehaviour(behaviour, optionId, 'behaviour');
  };

  renderBehaviour = () => {
    const { showBehaviourList } = this.state;
    const { item, optionNumber } = this.props;
    return (
      <div>
        {showBehaviourList !== false? (
          <BuilderBehaviour
            behaviour={item.behaviour}
            behaviourText={`Upon selecting Option ${optionNumber}, enable`}
            updateBehaviour={this.changeBehaviour()}
            showBehaviourList={showBehaviourList}
          />
        ): null}
        
      </div>
    );
  };

  render() {
    const { item: { id, name }, updateBehaviour, optionNumber, deleteQuestion } = this.props;
    const { showBehaviourList } = this.state;
    return (
      <div>
        {
          <div>
            <p>{`Enter Option ${optionNumber}`}</p>
            <div className="prompt-item">
              <input
                id="option-name-input"
                className="prompt-input"
                type="text" placeholder="Yes"
                value={name}
                onChange={(e) => updateBehaviour(e.target.value, id, 'name')}
              />
              <DeleteIcon id="option-del-icon" onClick={() => deleteQuestion(id)} />
            </div>
            <div className="behaviour-container">
              <div className="set-behaviour-btn-container">
                {!showBehaviourList && (
                  <button
                    onClick={() => this.showListOfBehaviours(id)}
                    type="button"
                    className="set-behaviour-btn"
                  >
                Set behaviour
                  </button>
                )}
              </div>
              <div>
                {this.renderBehaviour()}
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

RadioOptions.propTypes = {
  optionNumber: PropTypes.number.isRequired,
  updateBehaviour: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default RadioOptions;
