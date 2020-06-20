import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.scss';
import tick from '../../images/Tick/tick.svg';

class Checkbox extends PureComponent {
  state = {
    checkBox: localStorage.getItem('checkBox')
  };

  clickCheckbox = checkBox => {
    const { handleDisableInputs } = this.props;
    if (checkBox === 'notClicked') {
      this.setState({ checkBox: 'clicked' });
      checkBox = 'clicked';
    } else {
      this.setState({ checkBox: 'notClicked' });
      checkBox = 'notClicked';
    }
    handleDisableInputs(checkBox);
    this.renderCurrentState(checkBox);
  };

  renderCurrentState(status) {
    localStorage.setItem('checkBox', status);
  }

  renderCheckBox = () => {
    const state = localStorage.getItem('checkBox');
    const { handleDisableInputs } = this.props;
    let { checkBox } = this.state;
    let className = 'default';
    if (state === 'notClicked') {
      checkBox = state;
      className = 'checkbox clicked';
    } else if (state === 'clicked') {
      checkBox = state;
    }
    if (checkBox === 'clicked') {
      className = 'checkbox clicked';
      handleDisableInputs('clicked');
    } else {
      className = 'checkbox default';
      handleDisableInputs('notClicked');
    }
    return (
      <div
        className={className}
        onClick={() => {
          this.clickCheckbox(checkBox);
        }}
        role="button"
        tabIndex="0"
        onKeyDown={() => {
          this.clickCheckbox(checkBox);
        }}
        id="checkBox"
      >
        <img src={tick} alt="clicked" className="ticksvg" />
      </div>
    );
  };

  renderText = () => {
    return <p id="remember-my-details">Remember my personal details</p>;
  };

  render() {
    return (
      <div className="container flex-row">
        {this.renderCheckBox()}
        {this.renderText()}
      </div>
    );
  }
}

Checkbox.propTypes = {
  handleDisableInputs: PropTypes.func.isRequired
};

export default Checkbox;
