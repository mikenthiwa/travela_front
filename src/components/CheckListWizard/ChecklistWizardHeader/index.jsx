import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import PageHeader from '../../PageHeader';
import UndoIcon from '../images/Back.svg';
import BackIcon from '../images/left-arrow.svg';
import './index.scss';

export class ChecklistWizardHeader extends Component {

  componentDidMount() {
    document.addEventListener('keydown', this.shortcut, false);
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.shortcut, false);
  }

  shortcut = (event) => {
    const { disableUndo, disableRedo, redoChecklist, undoChecklist } = this.props;

    const shortcutKeys = [
      {
        name: 'redo action',
        condition: (event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'z' && !disableRedo,
        action: redoChecklist
      },
      {
        name: 'undo action',
        condition: (event.metaKey || event.ctrlKey) && event.key === 'z' && !event.shiftKey && !disableUndo,
        action: undoChecklist
      }
    ];

    shortcutKeys.forEach(item => item.condition && item.action());
  }

  redirectToChecklistConfigs = () => {
    const { history, resetChecklist } = this.props;
    resetChecklist();
    history.push('/trip-planner/checklist-wizard-interface');
  };

  render() {
    const { disableUndo, disableRedo, redoChecklist, undoChecklist } = this.props;
    return (
      <div className="checklist-builder-header">
        <div className="role-panel-header">
          <button className="checklist-back-btn" onClick={this.redirectToChecklistConfigs} type="button">
            <img className="backIcon" src={BackIcon} alt="back_icon" />
          </button>
          <PageHeader title="TRAVEL CHECKLIST BUILDER" /> 
          <div className="undo-redo-container">
            <button disabled={disableUndo} onClick={undoChecklist} className="undo" type="button">
              <img src={UndoIcon} alt="undo" />
            </button>
            <button disabled={disableRedo} onClick={redoChecklist} className="redo" type="button">
              <img src={UndoIcon} alt="undo" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ChecklistWizardHeader.propTypes = {
  history: PropTypes.object.isRequired,
  disableUndo: PropTypes.bool.isRequired,
  disableRedo: PropTypes.bool.isRequired,
  redoChecklist: PropTypes.func.isRequired,
  undoChecklist: PropTypes.func.isRequired,
  resetChecklist: PropTypes.func.isRequired,
};

export default withRouter(ChecklistWizardHeader);
