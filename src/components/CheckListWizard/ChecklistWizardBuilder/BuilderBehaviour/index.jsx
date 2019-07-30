import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../Shared/Dropdown';
import MetaData from '../../Shared/Dropdown/metaData';
import BehaviourPool from './BehaviourPool';
import * as actions from './behaviourActions';

class Behaviours extends PureComponent {

  handleBehaviourDropdownChange = (value) => {
    const { updateBehaviour } = this.props;
    updateBehaviour(BehaviourPool(value));
  }

  handleBehaviour = ({ target }) => {
    const { updateBehaviour, behaviour } = this.props;
    updateBehaviour(BehaviourPool(behaviour.type, target.value));
  }

  renderBehaviourInputType = () => {
    const { behaviour } = this.props;
    const payload = behaviour.payload || '';
    const actionType = behaviour.type || '';

    switch (actionType) {
    case actions.UPLOAD_DOCUMENT: 
      return null;
    case actions.SKIP_QUESTION:
      return (
        <input
          type="number"
          id="numberToSkipTo"
          className="behaviour-payload-input"
          onChange={this.handleBehaviour}
          placeholder="2"
          value={payload}
        />
      );
    case actions.NOTIFY_EMAIL:
      return (
        <input
          type="email"
          id="emailToSend"
          className="behaviour-payload-input"
          placeholder="ex. example@andela.com"
          value={payload}
          onChange={this.handleBehaviour}
        />
      );
    case actions.PREVIEW_DOCUMENT:
      return (
        <input
          type="text"
          id="documentToPreview"
          placeholder="https://link.com"
          value={payload}
          className="behaviour-payload-input"
          onChange={this.handleBehaviour}
        />
      );
    default: return null;
    }
  }

  render() {
    return (
      <div className="behaviour-select-type-container">
        <div className="behaviour-dropdown-container">
          <Dropdown dropdownOptions={MetaData.behaviourTypeDropdownMetaData} changeFunc={this.handleBehaviourDropdownChange} />
        </div>
        {this.renderBehaviourInputType()}
      </div>
    );
  }
}

Behaviours.propTypes = {
  behaviour: PropTypes.object.isRequired,
  updateBehaviour: PropTypes.func.isRequired,
};

export default Behaviours;
