import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../Shared/Dropdown';
import MetaData from '../../Shared/Dropdown/metaData';
import BehaviourPool from './BehaviourPool';

class Behaviours extends Component {
  state = {
    noAction: false,
    actionType: 'default',
    numberToSkipTo: '',
    documentToPreview: '',
    emailToSend: ''
  };

  handleBehaviourDropdownChange = (value) => {
    const event = {target : { value }};
    this.onBehaviourChange(event);
  }

  onBehaviourChange = ({ target }) => {
    const { updateBehaviour, order, optionId } = this.props;
    if (target.value === 'skip to another question') {
      this.setState({ noAction: true, actionType: target.value });
    }

    if (target.value === 'upload a document') {
      this.setState({ noAction: false, actionType: target.value });
      updateBehaviour(BehaviourPool({name:target.value}), order, optionId, 'behaviour');
    }

    if (target.value === 'preview document') {
      this.setState({ noAction: true, actionType: target.value });
    }

    if (target.value === 'notify an email address') {
      this.setState({ noAction: true, actionType: target.value });
    }
  };

  handleBehaviour = ({target}) => {
    const { updateBehaviour, order, optionId } = this.props;
    const { actionType } = this.state;
    updateBehaviour(BehaviourPool({name: actionType, payload: target.value}), order, optionId, 'behaviour');
  }

  handleInputBehaviour = ({target}) => {
    this.setState({[target.id]: target.value});
  }

  renderBehaviourInputType = (actionType) => {
    const { numberToSkipTo, documentToPreview, emailToSend } = this.state;
    switch (actionType) {
    case 'skip to another question':
      return (
        <input
          type="number"
          id="numberToSkipTo"
          className="behaviour-payload-input"
          onChange={this.handleInputBehaviour}
          placeholder="2"
          onKeyUp={this.handleBehaviour}
          value={numberToSkipTo}
        />
      );
    case 'notify an email address':
      return (
        <input
          type="email"
          id="emailToSend"
          className="behaviour-payload-input"
          placeholder="ex. example@andela.com"
          value={emailToSend}
          onChange={this.handleInputBehaviour}
          onKeyUp={this.handleBehaviour}
        />
      );
    case 'preview document':
      return (
        <input
          type="text"
          id="documentToPreview"
          placeholder="https://link.com"
          value={documentToPreview}
          className="behaviour-payload-input"
          onChange={this.handleInputBehaviour}
          onKeyUp={this.handleBehaviour}
        />
      );
    }
  }

  render() {
    const { noAction, actionType } = this.state;
    return (
      <div className="behaviour-select-type-container">
        <div className="behaviour-dropdown-container">
          <Dropdown dropdownOptions={MetaData.behaviourTypeDropdownMetaData} changeFunc={this.handleBehaviourDropdownChange} />
        </div>
        {noAction && this.renderBehaviourInputType(actionType)}
      </div>
    );
  }
}

Behaviours.propTypes = {
  order: PropTypes.number.isRequired,
  optionId: PropTypes.number.isRequired,
  updateBehaviour: PropTypes.func.isRequired,
};

export default Behaviours;
