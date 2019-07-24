import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BuilderBehaviour from '../BuilderBehaviour';
import Helper from '../BuilderOptions/helper';
import CheckboxOption from './CheckboxOption';

class RenderCheckbox extends Component {
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
          type="checkbox"
        />
      </div>
    );
  };

  renderCheckboxBehaviour = (showBehaviourList, order, updateBehaviour) => (
    <div className="behaviour-container">
      <div className="set-behaviour-btn-container">
        {showBehaviourList ? null : (
          <button
            onClick={() => this.showListOfBehaviours(order)}
            type="button"
            className="set-behaviour-btn"
          >
            Set behaviour
          </button>
        )}
      </div>
      <div>
        {showBehaviourList && this.renderBehaviour(updateBehaviour, order, order + 1)}
      </div>
    </div>
  )

  render() {
    const { addQuestion, configuration, updateBehaviour, order, deleteQuestion } = this.props;
    const { showBehaviourList } = this.state;
    return (
      <div>
        {configuration.options.map((item, i) => (
          <div key={item.id}>
            <p>{`Enter Option ${i + 1}`}</p>
            <CheckboxOption
              updateBehaviour={updateBehaviour}
              order={order}
              name={item.name}
              optionId={item.id}
              deleteQuestion={deleteQuestion}
            />
          </div>
        ))}
        {this.renderCheckboxBehaviour(showBehaviourList, order, updateBehaviour)}
        <button
          className="anoter-question-btn"
          onClick={() => addQuestion(order)}
          type="button">
          {`Add a ${Helper.getSuffix(configuration.options.length + 1)} option`}
        </button>
      </div>
    );
  }
}

RenderCheckbox.propTypes = {
  order: PropTypes.number.isRequired,
  configuration: PropTypes.shape({ options: PropTypes.array }).isRequired,
  addQuestion: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  updateBehaviour: PropTypes.func.isRequired,
};

export default RenderCheckbox;
