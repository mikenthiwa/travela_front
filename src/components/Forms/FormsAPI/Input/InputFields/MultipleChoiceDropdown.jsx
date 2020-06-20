import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MultiChoiceDropdown.scss';
import selectDropdownIcon from '../../../../../images/icons/form_select_dropdown.svg';

export default class MultipleChoiceDropdown extends Component {
  state = {
    open: false,
    selectedOption: 0,
    value: ''
  };
  dropdown = React.createRef();
  input = React.createRef();

  handleMenuClick = (index) => {
    this.setState({ selectedOption: index});
  };

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
    const { onChange, options } = this.props;
    this.setState({ value, open: false }, () => {
      const { selectedOption, value } = this.state;
      onChange({ target: {
        ...this.input.current,
        value: {
          option: options[selectedOption].name,
          value
        }
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

  renderDropdown() {
    const { selectedOption, value, open } = this.state;
    const { options } = this.props;

    return (
      <div className={`multichoice-dropdown__dropdown ${open ? 'open': 'closed'}`}>
        <ul className="multichoice-dropdown__dropdown__menu">
          {options.map((option, index) => (
            <li
              role="presentation"
              className={`${index === selectedOption ? 'active' : ''}`}
              key={option.name}
              onClick={() => this.handleMenuClick(index)}
            >
              {option.name}
            </li>
          ))}
        </ul>
        <ul className="multichoice-dropdown__dropdown__list">
          {options[selectedOption].items &&
            options[selectedOption].items.map((item) => (
              <li
                key={item + Math.random()}
                className={`${item === value ? 'active': ''}`}
                role="presentation"
                onClick={() => this.handleChoice(item)}>
                {item}
              </li>
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
        className={`multichoice-dropdown ${open ? 'open': 'closed'}`}
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
MultipleChoiceDropdown.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired
};
MultipleChoiceDropdown.defaultProps = {
  onChange: () => {}
};
