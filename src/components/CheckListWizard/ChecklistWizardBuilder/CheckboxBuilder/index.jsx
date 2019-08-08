import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import BuilderBehaviour from '../BuilderBehaviour';
import Helper from '../BuilderOptions/helper';
import CheckboxOption from './CheckboxOption';


class RenderCheckbox extends Component {
  state = {
    showBehaviourList: false,
  };

  showListOfBehaviours = () => {
    const { showBehaviourList } = this.state;
    this.setState({ showBehaviourList: !showBehaviourList });
  };

  updateBehaviour = (behaviour) => {
    const { showBehaviourList } = this.state;
    const { item, handleItems } = this.props;
    this.setState({ showBehaviourList: !!behaviour }, handleItems({ ...item, behaviour }));
  };

  updateOptions = (option) => {
    const { item, handleItems } = this.props;
    const newOptions = item.configuration.options.map(opt => opt.id === option.id ? option : opt);
    handleItems({
      ...item,
      configuration: {
        ...item.configuration,
        options: newOptions,
      }
    });
  }

  addQuestion = () => {
    const { item, handleItems } = this.props;
    const newQuestion = { id: shortId.generate(), name: '', behaviour: {} };
    const newItem = {
      ...item,
      configuration: {
        ...item.configuration,
        options: [...item.configuration.options, newQuestion]
      }
    };
    handleItems(newItem);
  }

  deleteQuestion = (id) => {
    const { item, handleItems } = this.props;
    const newItem = {
      ...item,
      behaviour: {},
      configuration: {
        ...item.configuration,
        options: item.configuration.options.filter(question => question.id !== id),
      }
    };
    handleItems(newItem);
  }

  renderBehaviour = () => {
    const { showBehaviourList } = this.state;
    const { item: { behaviour } } = this.props;
    return (
      <div>
        {showBehaviourList ? (
          <BuilderBehaviour
            behaviourText="Upon selecting any option, enable"
            updateBehaviour={this.updateBehaviour}
            showBehaviourList={showBehaviourList}
            behaviour={behaviour || {}}
          />
        ): null}
      </div>
    );
  };

  renderCheckboxBehaviour = () => {
    const { showBehaviourList } = this.state;
    return (
      <div className="behaviour-container">
        <div className="set-behaviour-btn-container">
          {!showBehaviourList && (
            <button
              onClick={this.showListOfBehaviours}
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
    );
  };

  render() {
    const { item: { configuration }} = this.props;
    return (
      <div>
        {configuration.options.map((option, i) => (
          <div key={option.id}>
            <p>{`Enter Option ${i + 1}`}</p>
            <CheckboxOption
              updateBehaviour={this.updateOptions}
              option={option}
              deleteQuestion={this.deleteQuestion}
            />
          </div>
        ))}
        {this.renderCheckboxBehaviour()}
        <button
          className="anoter-question-btn"
          onClick={this.addQuestion}
          type="button">
          {`Add a ${Helper.getSuffix(configuration.options.length + 1)} option`}
        </button>
      </div>
    );
  }
}

RenderCheckbox.defaultProps = {
  configuration: {},
};
RenderCheckbox.propTypes = {
  item: PropTypes.object.isRequired,
  handleItems: PropTypes.func.isRequired,
  configuration: PropTypes.shape({ options: PropTypes.array }),
};

export default RenderCheckbox;
