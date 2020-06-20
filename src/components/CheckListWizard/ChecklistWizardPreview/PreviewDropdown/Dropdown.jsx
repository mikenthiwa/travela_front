import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import './index.scss';
import selectDropdownIcon from '../../../../images/icons/form_select_dropdown.svg';

class Dropdown extends Component {
  state = {
    open: false,
    option: {}
  };
  container = React.createRef();
  input = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentDidUpdate() {
    const { configuration: { options } } = this.props;
    const { option } = this.state;
    const newOption =  options.find(item => item.id === option.id) || {};
    if (!isEqual(option, newOption)) return this.handleItemChoice(newOption);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({
        open: false
      });
    }
  };

  handleClick = () => {
    this.setState((state) => {
      return {
        open: !state.open
      };
    });
  };

  handleItemChoice = (option) => {
    const { handleCheckName } = this.props;
    this.setState({ option, open: false }, handleCheckName(option.behaviour));
  };

  render() {
    const { configuration } = this.props;
    const { options } = configuration;
    const { open, option } = this.state;
    return (
      <div>
        <div ref={this.container} className="style-container">
          <input
            className="input"
            type="text"
            onClick={this.handleClick}
            value={option.name || ''}
            readOnly="readOnly"
          />
          <img 
            src={selectDropdownIcon} 
            alt="icn" 
            onClick={this.handleClick} 
            role="presentation" 
          />
          {open && (
            <div className="dropdown">
              {options.map((option) => (
                <ul 
                  key={option.id}
                  role="presentation"
                  onClick={() => this.handleItemChoice(option)}
                > 
                  <li>
                    {option.name}
                  </li>
                </ul>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  handleCheckName: PropTypes.func.isRequired,
  configuration: PropTypes.shape({options: PropTypes.array}).isRequired,
};

export default Dropdown;
