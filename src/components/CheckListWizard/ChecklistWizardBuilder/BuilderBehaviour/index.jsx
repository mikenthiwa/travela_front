import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../Shared/Dropdown';
import MetaData from '../../Shared/Dropdown/metaData';
import BehaviourPool from './BehaviourPool';
import * as actions from './behaviourActions';
import ContextMenu from '../../../ContextMenu/ContextMenu';
import MenuItem from '../../../ContextMenu/MenuItem';
import PreviewDocumentUpload from './PreviewDocumentUpload';

class Behaviours extends PureComponent {

  handleBehaviourDropdownChange = (value) => {
    const { updateBehaviour } = this.props;
    updateBehaviour(BehaviourPool(value));
  }

  handleBehaviour = ({ target }, file) => {
    const { updateBehaviour, behaviour } = this.props;
    updateBehaviour(BehaviourPool(behaviour.type, target ? target.value : file));
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
        <PreviewDocumentUpload
          handleBehaviour={this.handleBehaviour}
        />
      );
    default: return null;
    }
  }

  render() {
    const { showBehaviourList, behaviourText, updateBehaviour } = this.props;
    return (
      <Fragment>
        <div className="remove-set-behaviour"> 
          {' '}
          {showBehaviourList?(
            <span>
              <ContextMenu>
                <MenuItem 
                  classNames="delete"
                  onClick={() => updateBehaviour({})}
                >
              Remove Behaviour
                </MenuItem>
              </ContextMenu>
            </span>
          ): null}
          {behaviourText}
        </div>
        <div className="behaviour-select-type-container">
          <div className="behaviour-dropdown-container">
            <Dropdown dropdownOptions={MetaData.behaviourTypeDropdownMetaData} changeFunc={this.handleBehaviourDropdownChange} />
          </div>
          {this.renderBehaviourInputType()}
        </div>
      </Fragment>
      
    );
  }
}
Behaviours.defaultProps = {
  behaviourText: 'string',
  showBehaviourList: false
};
Behaviours.propTypes = {
  behaviourText: PropTypes.string,
  behaviour: PropTypes.object.isRequired,
  updateBehaviour: PropTypes.func.isRequired,
  showBehaviourList: PropTypes.bool,
};

export default Behaviours;
