import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SelectChoiceDropdown.scss';
import selectDropdownIcon from '../../../../../images/icons/form_select_dropdown.svg';

export default class SelectChoiceDropdown extends Component {
  state = {
    open: false,
    openInner: false,
    selectedOption: 0,
    value: ''
  };
  dropdown = React.createRef();
  input = React.createRef();

  componentDidMount = () => {
    document.addEventListener('click', this.hideDropdownOnClickOutside);
  };

  hideDropdownOnClickOutside = (e) => {
    if(this.dropdown && e.target && !this.dropdown.current.contains(e.target)){
      this.setState({ open: false});
    }
  };

  componentWillUnmount = () => {
    document.removeEventListener('click', this.hideDropdownOnClickOutside);
  };

  handleChoice = (value) => {
    const { onChange } = this.props;
    this.setState({ value, open: false }, () => {
      const { value } = this.state;
      onChange({ target: {
        ...this.input.current,
        value
      }});
    });
  };

  handleClick = () => {
    this.setState((state) => {
      return {
        open: !state.open
      };
    });
  };

  handleToggleInnerDropdown = (index) => {
    this.setState((state) => {
      return {
        selectedOption: index,
        openInner: !state.openInner
      };
    });
  };

  renderDropdownList = (index) => {
    const { selectedOption, value } = this.state;
    const { options } = this.props;

    return (
      <ul className="selectChoice-dropdown__dropdown__list">
        {options[index].items &&
        index === selectedOption &&
        options[index].items.map((item) => (
          <li
            key={item + Math.random()}
            className={`${item === value ? 'active': ''}`}
            role="presentation"
            onClick={() => this.handleChoice(item)}>
            {item}
          </li>
        ))}
      </ul>
    );
  };

  renderDropdown() {
    const { open, openInner } = this.state;
    const { options } = this.props;

    return (
      <div className={`selectChoice-dropdown__dropdown ${open ? 'open': 'closed'}`}>
        <ul className="selectChoice-dropdown__dropdown__menu">
          {options.map((option, index) => (
            <div key={option.name}>
              <div>
                <li
                  role="presentation"
                  onClick={() => this.handleChoice(option.name)}
                >
                  {option.name}
                </li>
                {option.items.length > 0 ? (
                  <img
                    src={selectDropdownIcon} alt="icn"
                    onClick={() => this.handleToggleInnerDropdown(index)}
                    role="presentation"
                  />
                ) : null}
              </div>
              {openInner ? this.renderDropdownList(index) : null}
            </div>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { open, value } = this.state;
    const { onChange } = this.props;
    return (
      <div
        ref={this.dropdown}
        className={`selectChoice-dropdown ${open ? 'open': 'closed'}`}
      >
        <div className="style-dropdown">
          <input
            type="text" value={value}
            ref={this.input}
            id="flight-input"
            onChange={onChange}
            onClick={this.handleClick}
            autoComplete="off"
          />
          <img
            src={selectDropdownIcon} alt="icn"
            onClick={this.handleClick}
            role="presentation"
          />
        </div>
        {this.renderDropdown()}
      </div>
    );
  }
}
SelectChoiceDropdown.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired
};
SelectChoiceDropdown.defaultProps = {
  onChange: () => {}
};
