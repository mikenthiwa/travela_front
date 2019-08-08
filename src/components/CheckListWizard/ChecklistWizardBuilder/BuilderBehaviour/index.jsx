import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../Shared/Dropdown';
import MetaData from '../../Shared/Dropdown/metaData';
import BehaviourPool from './BehaviourPool';
import * as actions from './behaviourActions';
import ContextMenu from '../../../ContextMenu/ContextMenu';
import MenuItem from '../../../ContextMenu/MenuItem';
import PreviewDocumentUpload from './PreviewDocumentUpload';
import Helper from '../BuilderOptions/helper';

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
    if (!behaviour) return null;
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
          onKeyDown={Helper.disableInputUndoActions}
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
          onKeyDown={Helper.disableInputUndoActions}
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
    const { showBehaviourList, behaviourText, updateBehaviour, behaviour } = this.props;
    return (
      <Fragment>
        <div className="remove-set-behaviour"> 
          {' '}
          {showBehaviourList?(
            <span>
              <ContextMenu>
                <MenuItem 
                  classNames="delete"
                  onClick={() => updateBehaviour(null)}
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
            <Dropdown dropdownOptions={MetaData.behaviourTypeDropdownMetaData} value={behaviour.type || ''} changeFunc={this.handleBehaviourDropdownChange} />
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
